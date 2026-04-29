import { getSoundEnabled } from './soundPref.js';

let ctx;
function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function tone(ctx, freq, startAt, duration, gain = 0.28) {
  const osc  = ctx.createOscillator();
  const vol  = ctx.createGain();
  osc.connect(vol);
  vol.connect(ctx.destination);
  osc.type = 'sine';
  osc.frequency.value = freq;
  vol.gain.setValueAtTime(gain, startAt);
  vol.gain.exponentialRampToValueAtTime(0.001, startAt + duration);
  osc.start(startAt);
  osc.stop(startAt + duration);
}

export function playCorrect() {
  if (!getSoundEnabled()) return;
  const c = getCtx(), now = c.currentTime;
  tone(c, 523, now,        0.12);   // C5
  tone(c, 659, now + 0.10, 0.18);   // E5
}

export function playWrong() {
  if (!getSoundEnabled()) return;
  const c = getCtx(), now = c.currentTime;
  const osc  = c.createOscillator();
  const vol  = c.createGain();
  osc.connect(vol);
  vol.connect(c.destination);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(310, now);
  osc.frequency.exponentialRampToValueAtTime(160, now + 0.22);
  vol.gain.setValueAtTime(0.28, now);
  vol.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
  osc.start(now);
  osc.stop(now + 0.22);
}
