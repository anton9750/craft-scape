let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  try {
    if (!ctx) ctx = new AudioContext();
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

export function unlockAudio() {
  getCtx();
}

function beep(
  type: OscillatorType,
  freq: number,
  duration: number,
  gain = 0.16,
  slide?: number,
) {
  const c = getCtx();
  if (!c) return;
  const now = c.currentTime;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, now);
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, slide), now + duration);
  g.gain.setValueAtTime(gain, now);
  g.gain.exponentialRampToValueAtTime(0.001, now + duration);
  o.connect(g);
  g.connect(c.destination);
  o.start(now);
  o.stop(now + duration + 0.02);
}

export function playDragSound() {
  beep("sine", 420, 0.1, 0.12, 180);
}

export function playTransformSound() {
  beep("triangle", 523.25, 0.55, 0.2, 784);
  const c = getCtx();
  if (!c) return;
  const now = c.currentTime;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = "sine";
  o.frequency.setValueAtTime(1046.5, now + 0.08);
  o.frequency.exponentialRampToValueAtTime(1568, now + 0.35);
  g.gain.setValueAtTime(0.1, now + 0.08);
  g.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
  o.connect(g);
  g.connect(c.destination);
  o.start(now + 0.08);
  o.stop(now + 0.5);
}

export function playFailSound() {
  beep("square", 220, 0.18, 0.08, 90);
}

export function playPlaceSound() {
  beep("sine", 660, 0.09, 0.1, 440);
}
