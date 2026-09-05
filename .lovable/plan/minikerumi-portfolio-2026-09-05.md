# MiniKerumi Portfolio

## Overview
Build a single-page, non-commercial creative portfolio for MiniKerumi, blending the urban graphic energy of *Zenless Zone Zero* with the sleek supernatural city atmosphere of *Neverness to Everness*. The site will showcase all six uploaded GFX works and clearly distinguish the creator's original scene work from the credited character/model ownership.

## Visual direction
- **Palette:** Neon District — charcoal `#17181C`, cyan `#20D9E8`, magenta `#EC4CCB`, and acid yellow `#D8F238`.
- **Typography:** Bebas Neue for high-impact poster headings; Barlow for clean, readable body text.
- **Composition:** Hero + Gallery. A full-width opening led by **Zenara Light**, followed by a structured six-piece gallery.
- Use sharp editorial framing, offset labels, graphic rules, restrained scan-line/noise details, and asymmetrical accents inspired by urban action-game interfaces without copying official branding or logos.
- Motion will be purposeful and light: opening text reveal, subtle image movement, and focused gallery interactions, with reduced-motion support.

## Page structure
1. **Navigation**
   - MiniKerumi wordmark.
   - Compact links to About, Works, and Tools.
   - A visible “Personal Portfolio” marker rather than a commission button.

2. **Opening section**
   - Feature the uploaded `ZenaraLight.png` artwork as the main visual.
   - Headline: **MINIKERUMI**
   - Supporting line: **GFX Artist · Animator · Network Engineer**
   - State clearly that this is a passion portfolio and commissions are currently closed.
   - Provide a direct “View Works” action.

3. **About**
   - Refine the supplied introduction into polished first-person copy:
     > Hi, I’m MiniKerumi—a GFX artist and aspiring animator who creates for the joy of learning. I’m always experimenting, practicing, and finding something new to love in every piece I make. Outside of art, I’m a network engineer with a Bachelor of Science in Information Technology, specializing in Network Technology.

4. **Selected works gallery**
   - Display all six uploaded pieces with their original aspect ratios respected.
   - Use the supplied filenames only as internal references; present clean, tasteful titles based on each work rather than exposing raw filenames.
   - Open artwork in a focused lightbox so visitors can inspect it at a larger size.
   - Keep captions concise and avoid inventing dates, clients, or project claims.

5. **Tools and practice**
   - Highlight **Blender** and **Goo Engine** as the tools used.
   - Frame the work as an ongoing personal study in GFX and animation rather than professional commission work.

6. **Credits and disclaimer**
   - Include a clearly visible statement:
     > All compositions, lighting, posing, and renders shown here were created by MiniKerumi. Character designs, 3D models, and related intellectual property belong to their respective owners and creators. This is a non-commercial fan portfolio created for practice and personal expression. No official affiliation or endorsement is implied.

7. **Footer**
   - Minimal MiniKerumi signature and non-commercial portfolio note.

## Technical details
- Use the existing one-page home screen and add unique portfolio metadata for sharing/search results.
- Upload the six supplied images through the project’s media delivery system and use descriptive alt text.
- Define the selected colors and fonts as reusable design tokens; load fonts correctly in the document head.
- Build responsive layouts for desktop and mobile, preserving image framing and preventing text overlap.
- Add accessible keyboard controls and focus states for navigation and the artwork lightbox.
- No backend, account system, contact form, or commission workflow will be added.

## Validation
- Verify the page visually on desktop and mobile.
- Confirm all six images load, the lightbox works by mouse and keyboard, and reduced-motion preferences are respected.
- Check that no placeholder screen, official game logos, or wording implying ownership/affiliation remains.
