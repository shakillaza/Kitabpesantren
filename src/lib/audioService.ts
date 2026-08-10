// Robust Audio & Text-To-Speech (TTS) Service for SHAQILA DIGITAL 99
// Supports Arabic (Murottal/Kitab) and Indonesian recitation via HTML5 Web Speech API
// with Web Audio API fallback chime synthesizer.

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// Play pleasant Web Audio API notification/chime sound
export function playChimeSound(type: "play" | "stop" | "success" = "play") {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    const now = ctx.currentTime;

    if (type === "play") {
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.15); // E5
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === "stop") {
      osc.frequency.setValueAtTime(440, now); // A4
      osc.frequency.exponentialRampToValueAtTime(330, now + 0.15); // E4
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === "success") {
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    }
  } catch (err) {
    console.warn("Web Audio API not supported or blocked", err);
  }
}

// Clean markdown and non-verbal symbols for smooth TTS
function cleanTextForTTS(rawText: string): string {
  return rawText
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/#/g, "")
    .replace(/`/g, "")
    .replace(/\[.*?\]/g, "")
    .replace(/[\(\)\[\]]/g, " ")
    .replace(/--/g, " ")
    .replace(/_{1,2}/g, "")
    .trim();
}

// Detect if text contains Arabic characters
export function isArabicText(text: string): boolean {
  return /[\u0600-\u06FF]/.test(text);
}

interface LanguageChunk {
  text: string;
  isArab: boolean;
}

// Split text into distinct Arabic and non-Arabic (Indonesian) segments
function segmentTextByLanguage(rawText: string): LanguageChunk[] {
  const clean = cleanTextForTTS(rawText);
  if (!clean) return [];

  // Split by major structural punctuation or newlines
  const lines = clean.split(/(?<=[.!?\n])\s+/);
  const chunks: LanguageChunk[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const hasArabic = /[\u0600-\u06FF]/.test(trimmed);
    const hasLatin = /[a-zA-Z]/.test(trimmed);

    if (hasArabic && hasLatin) {
      // Line contains both (e.g. "Tafsir: yarfai Allah..."), split Arabic vs Latin characters
      const parts = trimmed.split(/([\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]+)/);
      for (const p of parts) {
        const pTrim = p.trim();
        if (!pTrim) continue;
        const pIsArab = /[\u0600-\u06FF]/.test(pTrim);

        if (chunks.length > 0 && chunks[chunks.length - 1].isArab === pIsArab) {
          chunks[chunks.length - 1].text += " " + pTrim;
        } else {
          chunks.push({ text: pTrim, isArab: pIsArab });
        }
      }
    } else {
      if (chunks.length > 0 && chunks[chunks.length - 1].isArab === hasArabic) {
        chunks[chunks.length - 1].text += " " + trimmed;
      } else {
        chunks.push({ text: trimmed, isArab: hasArabic });
      }
    }
  }

  return chunks;
}

// Helper to call backend Gemini TTS API safely
async function fetchGeminiTTS(text: string, lang: "ar" | "id" | "auto"): Promise<{ audioBase64: string; mimeType: string } | null> {
  try {
    const res = await fetch("/api/gemini/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, lang }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data?.audioBase64) {
      return { audioBase64: data.audioBase64, mimeType: data.mimeType || "audio/pcm;rate=24000" };
    }
    return null;
  } catch (e) {
    console.warn("Gemini TTS fetch failed:", e);
    return null;
  }
}

let activePlaybackToken: number = 0;

export function stopTextToSpeech() {
  activePlaybackToken++;
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  playChimeSound("stop");
}

// Main Text-To-Speech Player: Reads Arabic in Arabic voice & Indonesian in Indonesian voice
export async function playTextToSpeech(
  text: string,
  onEnd?: () => void,
  onError?: (err: any) => void
) {
  // Synchronously activate AudioContext on user click to satisfy browser user gesture policy
  getAudioContext();
  playChimeSound("play");
  
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  const cleanText = cleanTextForTTS(text);
  if (!cleanText) {
    if (onEnd) onEnd();
    return;
  }

  const currentToken = ++activePlaybackToken;
  const chunks = segmentTextByLanguage(cleanText);

  if (chunks.length === 0) {
    if (onEnd) onEnd();
    return;
  }

  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.resume();
  }

  let currentChunkIndex = 0;

  const playNextChunk = async () => {
    if (currentToken !== activePlaybackToken) return;

    if (currentChunkIndex >= chunks.length) {
      playChimeSound("stop");
      if (onEnd) onEnd();
      return;
    }

    const chunk = chunks[currentChunkIndex];
    currentChunkIndex++;

    const lang: "ar" | "id" = chunk.isArab ? "ar" : "id";

    // Step 1: Try high-quality Gemini TTS with language-matched voice and prompt
    try {
      const ttsResult = await fetchGeminiTTS(chunk.text, lang);
      if (currentToken !== activePlaybackToken) return;

      if (ttsResult?.audioBase64) {
        await playAudioBuffer(ttsResult.audioBase64, ttsResult.mimeType, () => {
          if (currentToken === activePlaybackToken) {
            playNextChunk();
          }
        });
        return;
      }
    } catch (e) {
      console.warn("Gemini TTS chunk fetch failed, trying Web Speech API fallback:", e);
    }

    // Step 2: Web Speech API Fallback for this chunk
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.resume();

      const voices = window.speechSynthesis.getVoices();
      const targetLangCode = chunk.isArab ? "ar" : "id";
      
      let matchedVoice = voices.find((v) =>
        v.lang.toLowerCase().startsWith(targetLangCode) ||
        v.lang.toLowerCase().includes(chunk.isArab ? "arabic" : "indonesian")
      );

      if (!matchedVoice && !chunk.isArab) {
        matchedVoice = voices.find((v) => v.lang.toLowerCase().startsWith("ms"));
      }

      const utterance = new SpeechSynthesisUtterance(chunk.text);

      if (chunk.isArab) {
        utterance.lang = "ar-SA";
        utterance.rate = 0.85; // Natural pace for Arabic recitation
        utterance.pitch = 1.0;
      } else {
        utterance.lang = "id-ID";
        utterance.rate = 0.95; // Natural pace for Indonesian narration
        utterance.pitch = 1.0;
      }

      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      utterance.onend = () => {
        if (currentToken === activePlaybackToken) {
          playNextChunk();
        }
      };

      utterance.onerror = (evt) => {
        console.warn("Utterance chunk playback warning:", evt);
        if (currentToken === activePlaybackToken) {
          playNextChunk();
        }
      };

      window.speechSynthesis.speak(utterance);
    } else {
      playNextChunk();
    }
  };

  playNextChunk();
}

// Play decoded audio buffer or raw 24kHz PCM from Gemini TTS
async function playAudioBuffer(base64Data: string, mimeType: string, onEnd?: () => void) {
  try {
    const binary = atob(base64Data);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    const ctx = getAudioContext();
    if (ctx.state === "suspended") {
      await ctx.resume();
    }

    let audioBuffer: AudioBuffer | null = null;

    // Try standard decodeAudioData first
    try {
      const bufferCopy = bytes.buffer.slice(0);
      audioBuffer = await ctx.decodeAudioData(bufferCopy);
    } catch {
      // Fallback for raw 16-bit PCM 24kHz
      const int16 = new Int16Array(bytes.buffer);
      const float32 = new Float32Array(int16.length);
      for (let i = 0; i < int16.length; i++) {
        float32[i] = int16[i] / 32768.0;
      }
      audioBuffer = ctx.createBuffer(1, float32.length, 24000);
      audioBuffer.getChannelData(0).set(float32);
    }

    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(ctx.destination);
    source.onended = () => {
      if (onEnd) onEnd();
    };
    source.start(0);
  } catch (e) {
    console.warn("Audio playback error:", e);
    if (onEnd) onEnd();
  }
}
