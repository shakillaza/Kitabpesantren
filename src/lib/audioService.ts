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
    .replace(/\(.*?\)/g, "")
    .replace(/--/g, " ")
    .replace(/_{1,2}/g, "")
    .trim();
}

// Detect if text contains Arabic characters
export function isArabicText(text: string): boolean {
  return /[\u0600-\u06FF]/.test(text);
}

// Main Text-To-Speech Player with Gemini 3.1 TTS + Arabic Web Speech API Fallback
export async function playTextToSpeech(
  text: string,
  onEnd?: () => void,
  onError?: (err: any) => void
) {
  playChimeSound("play");
  const cleanText = cleanTextForTTS(text);
  if (!cleanText) {
    if (onEnd) onEnd();
    return;
  }

  // Stop active web speech
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  // Try Gemini 3.1 TTS via server API
  try {
    const res = await safePostApi("/api/gemini/tts", { text: cleanText });
    if (res?.audioBase64) {
      playPCM24kAudio(res.audioBase64, () => {
        playChimeSound("stop");
        if (onEnd) onEnd();
      });
      return;
    }
  } catch (e) {
    console.warn("Gemini 3.1 TTS endpoint failed, using Web Speech API fallback:", e);
  }

  // Fallback to Browser Web Speech API (Arabic ar-SA)
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    console.warn("SpeechSynthesis is not supported in this browser.");
    if (onError) onError("Fitur Suara TTS tidak didukung di browser ini.");
    if (onEnd) onEnd();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = "ar-SA"; // Enforce Arabic Language
  utterance.rate = 0.85; // Natural pace for Arabic recitation
  utterance.pitch = 1.0;

  const voices = window.speechSynthesis.getVoices();
  let matchedVoice = voices.find(
    (v) => v.lang === "ar-SA" || v.lang.startsWith("ar") || v.lang.toLowerCase().includes("arabic")
  );

  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  utterance.onend = () => {
    playChimeSound("stop");
    if (onEnd) onEnd();
  };

  utterance.onerror = (evt) => {
    console.warn("TTS utterance error:", evt);
    playChimeSound("stop");
    if (onEnd) onEnd();
    if (onError) onError(evt);
  };

  window.speechSynthesis.speak(utterance);
}

// Play raw 24kHz PCM from Gemini TTS
function playPCM24kAudio(base64Pcm: string, onEnd?: () => void) {
  try {
    const binary = atob(base64Pcm);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const int16 = new Int16Array(bytes.buffer);
    const float32 = new Float32Array(int16.length);
    for (let i = 0; i < int16.length; i++) {
      float32[i] = int16[i] / 32768.0;
    }

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass({ sampleRate: 24000 });
    const buffer = ctx.createBuffer(1, float32.length, 24000);
    buffer.getChannelData(0).set(float32);

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.onended = () => {
      if (onEnd) onEnd();
    };
    source.start(0);
  } catch (e) {
    console.warn("PCM audio playback error:", e);
    if (onEnd) onEnd();
  }
}

export function stopTextToSpeech() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    playChimeSound("stop");
  }
}
