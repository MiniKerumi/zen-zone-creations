# ZZZ-style panel transition + separate pages

## What changes

Today everything lives on one long page and the menu just scrolls. This turns each
section into its own page and plays a cinematic panel wipe every time you move
between them.

## New pages

- `/` — opening screen (Zenara hero, name, tagline, "View works" button)
- `/about` — About / Still Creating
- `/works` — the six-piece gallery with the existing lightbox
- `/animation` — Sigrid clip and motion strip
- `/tools` — Practice & Tools, plus the credits/disclaimer

The top menu, the "Personal Portfolio" badge, the footer, and the music player
move into the shared frame so they stay put on every page and the song keeps
playing without restarting when you switch pages.

## The transition

Triggered on every menu click, logo click, in-page button that leads elsewhere,
and browser back/forward.

1. Five slanted panels sweep in from the right, one after another, roughly 55ms
   apart, overlapping as they stack into a full-screen cover.
2. Just after the last panel lands, **MiniKerumi** snaps into the centre with a
   quick scale/blur settle and a thin accent rule.
3. The new page is swapped in behind the cover while it is opaque.
4. The name fades, then the same five panels slide back out to the right with the
   same stagger, revealing the new page.

Timing: about 900ms–1.1s total. Snappy, overshoot-style easing (fast start, hard
settle) rather than a soft fade. Panels are cut with a skew so their edges are
diagonal, tinted charcoal with cyan/magenta/acid edge lines to match the site.

Guards:
- A transition already running ignores further clicks until it finishes.
- The cover sits above everything, blocks clicks while active, and is hidden from
  screen readers.
- With reduced motion turned on, the panels are skipped and the page swaps with a
  near-instant crossfade.

## Technical details

- New route files: `src/routes/about.tsx`, `works.tsx`, `animation.tsx`,
  `tools.tsx`; `src/routes/index.tsx` reduced to the hero. Each gets its own
  `head()` with distinct title/description/og tags.
- Shared chrome (nav, badge, footer, audio element + player UI) rendered in
  `src/routes/__root.tsx` around `<Outlet />` so the `<audio>` node is never
  unmounted. Music player state lifted into a small component there.
- New `src/components/PanelTransition.tsx` + a `useSectionTransition` hook holding
  `phase` (`idle | in | hold | out`) and an `isBusy` ref lock. Navigation uses
  `useNavigate()` fired at the "cover opaque" moment; nav items become buttons
  that call the hook, wrapping TanStack `Link` semantics.
- Panel/name keyframes added to `src/styles.css` as `panel-sweep-in`,
  `panel-sweep-out`, `stamp-in`, each panel driven by an `--i` index for stagger;
  all disabled under the existing `prefers-reduced-motion` block.
- Existing scroll-reveal (`[data-reveal]`) observer moves into a small shared hook
  so it re-runs on each page mount.
- No backend, no content or styling changes beyond the transition and the split.

## Validation

Click through every menu item and back/forward, confirm the panels always play,
double-clicking cannot stack two transitions, music keeps playing across pages,
the gallery lightbox still opens by mouse and keyboard, and reduced-motion users
get an instant swap.
