import zenara from "@/assets/zenara-light.png";
import crimson from "@/assets/crimson-elegance.png";
import dualSignal from "@/assets/dual-signal.png";
import cityPair from "@/assets/city-pair.png";
import firstGfx from "@/assets/first-gfx.png";
import afterHours from "@/assets/after-hours.png";

export const works = [
  {
    title: "Professor Zenara",
    tag: "Portrait / Lighting",
    src: zenara,
    alt: "Professor Zenara portrait illuminated by cyan and magenta light",
    span: "md:col-span-2",
  },
  {
    title: "Hsin the Moon Fox",
    tag: "Character Study",
    src: crimson,
    alt: "Hsin the Moon Fox in a red, black, and white outfit",
    span: "md:row-span-2",
  },
  {
    title: "Mesa & Billy",
    tag: "Crossover Composition",
    src: dualSignal,
    alt: "Mesa and Billy posed together against a dark backdrop",
    span: "",
  },
  {
    title: "Ramielle & Wise",
    tag: "Cinematic Moment",
    src: cityPair,
    alt: "Ramielle and Wise smiling together in a softly lit city interior",
    span: "",
  },
  {
    title: "Trigger",
    tag: "First GFX / ZZZ",
    src: firstGfx,
    alt: "Trigger suspended above a colorful urban street",
    span: "md:col-span-2",
  },
  {
    title: "Nicole & Lucy",
    tag: "Scene Study",
    src: afterHours,
    alt: "Nicole and Lucy posing in a warmly lit room",
    span: "",
  },
];

export type Work = (typeof works)[number];
