# Home page background video prompts

One prompt per color theme. Paste into a text-to-video model (Veo 3 / Sora 2 / Runway Gen-4 / Pika / Kling) along with the **shared technical spec** below.

## Shared technical spec (prepend to every prompt)

```
Aspect ratio: 16:9 (1920×1080 minimum, 4K preferred).
Duration: 6–10 seconds, designed to loop seamlessly (last frame matches first
frame, no hard cuts).
Camera: locked-off or extremely slow drift only — no whip pans, no jump cuts,
no parallax tricks.
Motion: gentle and continuous, no sudden movement, no fast subjects entering
or leaving the frame.
Subject: ambient and abstract — no human faces, no readable text, no logos,
no clocks, no specific recognizable objects that compete for attention.
Composition: very low contrast and busy-ness in the center 60% of the frame
so foreground UI text (white or near-black) remains readable on top.
Detail toward edges of frame is fine.
Color grade: muted, desaturated, no clipping highlights. Cinematic, not
saturated marketing-look.
Mood: focused, calm, scholarly. Not energetic, not playful, not "epic."
No music or sound (will be muted in browser).
Output: H.264 MP4, no audio track, no watermark.
```

---

## 1. `buffet` (default) — warm cream + dark brown

**Vibe:** editorial, vintage study, coffee-shop ambiance.

```
A single fountain pen rests on cream-colored parchment paper. Soft golden
morning light enters from the left, slowly drifting across the page. Tiny
dust motes float in the light beam. The parchment has the faintest hint of
old hand-written notes visible at the edge of frame, far enough out of focus
that the words are unreadable. Color palette: warm cream (#FDF6E8) base,
deep walnut brown (#1A0F08) shadows, brass and sepia accents. Shallow depth
of field — the center of the page is soft and unfocused. The only motion is
the slow drift of golden light and the gentle wandering of dust motes. No
hand, no person, no pen movement.
```

---

## 2. `navy` — pale blue + midnight blue

**Vibe:** cloud computing, deep ocean, technical infrastructure.

```
A slow drift over high-altitude cirrus clouds at dawn, viewed from above.
Wisps of cloud move at the speed of a Boeing window-seat view — almost
imperceptible. Color palette: ice-blue (#F0F6FF) highlights, midnight
indigo (#060D1A) shadows, a touch of cool silver where the light catches
the cloud peaks. No sun visible. No aircraft, no birds, no landmarks. The
clouds are sparse enough that there is plenty of negative space — the
center of frame is mostly empty pale blue. Slight grain. Camera glides
forward at constant speed without rotating.
```

---

## 3. `terminal` — mint + near-black green

**Vibe:** matrix, code, hacker terminal.

```
A wide field of softly glowing green particles — like microscopic phosphor
dots on an old CRT monitor. Particles drift downward at varying speeds in
a vertical rain pattern, but very sparse and very slow, not the dense
Matrix code-rain trope. Each particle fades in and out. Background is
near-black with a faint green tint (#060D06). Particle color is soft mint
(#A8E6B0) at maximum, never pure white. Slight scanline texture overlays
the whole frame at 5% opacity. The center 40% of the frame has noticeably
fewer particles to keep UI text readable. No text, no characters, no
numbers — just the glowing dots themselves. Camera is completely still.
```

---

## 4. `amber` — pale cream + deep purple-black

**Vibe:** vintage study lamp, late-night exam prep, sunset.

```
The blurred glow of a vintage incandescent filament bulb in the
upper-right corner of frame, casting warm amber light into an otherwise
dark space. The bulb itself is just barely visible as a soft halo, never
sharp. Particles of dust drift through the light beam, illuminated like
tiny stars when they pass through. Color palette: warm amber (#FDF8EF)
highlights on the right, deep aubergine and near-black violet (#0C0918)
filling the rest of the frame. The light slowly pulses once over the
duration of the loop, as if from a slightly unstable filament. No bulb
fixture is visible, no surrounding objects. Center of frame is mostly
shadow, perfect for UI overlay.
```

---

## 5. `classic` — pure white + pure black

**Vibe:** minimal, exam-room, focused.

```
Slow-falling fine paper-pulp particles, like dust shaken from a freshly
opened paperback book. Particles are off-white (#EEEEEE), soft-edged, with
slight motion blur. Background is pure flat black (#000000). The
particles vary in size from 1px to 4px on a 1080p frame, drifting downward
at different speeds — some almost stationary, others crossing the frame
in 8 seconds. There is no swirl, no wind, no convergence — just gentle
gravity. Center of frame has fewer particles than the edges. No shapes,
no gradient, no glow, no other element. Camera is completely still.
```

---

## 6. `pink` — pale pink + deep magenta-black

**Vibe:** soft, calming, gentle focus.

```
Drifting wisps of pink smoke or vapor, very thin and translucent,
flowing horizontally across the frame from right to left like slow river
mist. Color palette: blush pink (#FFD0E5) highlights, deep wine and
near-black magenta (#180010) in the shadows. The smoke is at the bottom
two-thirds of the frame, leaving the top third mostly clear. Volumetric
lighting from off-frame upper-left catches the smoke gently. No fast
turbulence, no swirls, no faces or shapes accidentally suggested by the
smoke. Movement is constant and one-directional. Camera is still.
```

---

## 7. `green` (forest variant of terminal) — fresh mint + deep forest

> Only generate this if you want a "forest" alternative to the digital terminal vibe.

```
Slow-motion close-up of fern fronds gently swaying in still forest air,
shot from above looking straight down. Dappled morning sunlight filters
through unseen tree canopy, creating slowly moving soft-edged light
patches on the green leaves below. Color palette: vivid spring green
(#A0D8A0) and soft mint highlights, deep moss and pine-forest shadows
(#1A2B1A). The light patches drift slowly across the frame as if clouds
were passing in front of the sun. No insects, no animals, no human
elements, no full sky visible. The fern leaves move only a few pixels —
just enough to feel alive. Slight grain for organic texture.
```

---

## Adapting per model

Most models do well with this directly. Slight tweaks if needed:

**Veo 3 / Sora 2 / Runway Gen-4** — paste as written. They follow the
"no music, no text, loops, low contrast in center" instructions well.

**Pika 2 / Kling 2** — drop the shared spec into the first paragraph
of the prompt. They sometimes ignore separate "negative prompts," so
fold "no faces, no text, no logos" inline.

**For looping** — if your tool doesn't have a native "seamless loop"
option, generate 8 seconds, then use FFmpeg to cross-fade the last
0.5 seconds back into the first frame:

```bash
ffmpeg -i raw.mp4 -filter_complex \
  "[0:v]reverse[r];[0:v][r]concat=n=2:v=1[v]" \
  -map "[v]" -an -movflags +faststart loop.mp4
```

This creates a "boomerang" loop that always plays forward then reverse —
perfect for ambient backgrounds and ensures no visible cut.

## File naming + placement (when assets land)

```
public/video/bg-buffet.mp4
public/video/bg-navy.mp4
public/video/bg-terminal.mp4
public/video/bg-amber.mp4
public/video/bg-classic.mp4
public/video/bg-pink.mp4
public/video/bg-green.mp4    (optional)
```

Target ≤ 2 MB per file (heavy compression is fine — these are background).
Consider also exporting a `bg-<theme>.webm` (VP9) for ~40% smaller payload
on Chrome/Firefox. Browser fallback chain handles the rest.

When you have the files, ask me to wire them into the home page — needs
a `<video autoplay muted loop playsinline>` element behind `#main-content`
with `data-color`-driven `source` switching. ~30 lines of CSS + JS.
