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

// Main Text-To-Speech Player
export function playTextToSpeech(
  text: string,
  onEnd?: () => void,
  onError?: (err: any) => void
) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    console.warn("SpeechSynthesis is not supported in this browser.");
    playChimeSound("play");
    if (onError) onError("Fitur Suara TTS tidak didukung di browser ini.");
    return;
  }

  // Stop any active speech
  window.speechSynthesis.cancel();
  playChimeSound("play");

  const cleanText = cleanTextForTTS(text);
  if (!cleanText) {
    if (onEnd) onEnd();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(cleanText);

  // Language & Voice Selection
  const isArab = isArabicText(cleanText);
  const targetLang = isArab ? "ar-SA" : "id-ID";
  utterance.lang = targetLang;
  utterance.rate = isArab ? 0.85 : 0.95; // Slightly slower for clear Arabic pronunciation
  utterance.pitch = 1.0;

  // Try matching best voice
  const voices = window.speechSynthesis.getVoices();
  let matchedVoice = voices.find(
    (v) => v.lang === targetLang || v.lang.startsWith(isArab ? "ar" : "id")
  );

  if (!matchedVoice && isArab) {
    // Fallback Arabic voices
    matchedVoice = voices.find((v) => v.lang.toLowerCase().includes("ar"));
  }

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

  // Speak!
  window.speechSynthesis.speak(utterance);
}

export function stopTextToSpeech() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    playChimeSound("stop");
  }
}
