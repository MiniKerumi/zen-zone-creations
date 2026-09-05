import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, Expand, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import zenara from "@/assets/zenara-light.png.asset.json";
import crimson from "@/assets/crimson-elegance.png.asset.json";
import dualSignal from "@/assets/dual-signal.png.asset.json";
import cityPair from "@/assets/city-pair.png.asset.json";
import firstGfx from "@/assets/first-gfx.png.asset.json";
import afterHours from "@/assets/after-hours.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MiniKerumi | GFX Artist & Animator" },
      { name: "description", content: "Explore MiniKerumi's personal GFX and animation portfolio, created with Blender and Goo Engine." },
      { property: "og:title", content: "MiniKerumi | GFX Artist & Animator" },
      { property: "og:description", content: "A personal collection of stylized GFX, lighting, posing, and renders by MiniKerumi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const works = [
  { title: "Zenara Light", tag: "Portrait / Lighting", src: zenara.url, alt: "Stylized character portrait illuminated by cyan and magenta light", span: "md:col-span-2" },
  { title: "Crimson Elegance", tag: "Character Study", src: crimson.url, alt: "Full-length fantasy character in a red, black, and white outfit", span: "md:row-span-2" },
  { title: "Dual Signal", tag: "Crossover Composition", src: dualSignal.url, alt: "Two stylized action characters posed together against a dark backdrop", span: "" },
  { title: "City Pair", tag: "Cinematic Moment", src: cityPair.url, alt: "Two animated characters smiling together in a softly lit city interior", span: "" },
  { title: "First Signal", tag: "First GFX / Action", src: firstGfx.url, alt: "Armed character suspended above a colorful urban street", span: "md:col-span-2" },
  { title: "After Hours", tag: "Scene Study", src: afterHours.url, alt: "Two characters posing in a warmly lit room", span: "" },
];

function Index() {
  const [activeWork, setActiveWork] = useState<(typeof works)[number] | null>(null);

  useEffect(() => {
    if (!activeWork) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setActiveWork(null);
    window.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [activeWork]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <nav aria-label="Main navigation" className="absolute inset-x-0 top-0 z-30 border-b border-foreground/15 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[92rem] items-center justify-between px-5 lg:px-10">
          <a href="#top" className="font-display text-2xl tracking-normal text-foreground">MINI<span className="text-primary">KERUMI</span></a>
          <div className="hidden items-center gap-7 text-sm font-semibold uppercase md:flex">
            <a href="#about" className="transition-colors hover:text-primary">About</a>
            <a href="#works" className="transition-colors hover:text-primary">Works</a>
            <a href="#tools" className="transition-colors hover:text-primary">Tools</a>
          </div>
          <span className="border border-accent/70 bg-accent px-3 py-1 text-xs font-bold uppercase text-accent-foreground">Personal Portfolio</span>
        </div>
      </nav>

      <header id="top" className="relative flex min-h-[92vh] items-end overflow-hidden border-b border-border">
        <img src={zenara.url} alt="Zenara Light character portrait by MiniKerumi" className="absolute inset-0 h-full w-full object-cover object-[64%_center]" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/65 to-background/10" />
        <div className="absolute inset-x-0 top-16 h-px bg-primary/50" />
        <div className="relative z-10 mx-auto w-full max-w-[92rem] px-5 pb-16 pt-32 lg:px-10 lg:pb-20">
          <p className="mb-4 flex items-center gap-3 text-xs font-bold uppercase text-primary"><span className="h-px w-10 bg-primary" /> Digital practice log · 2026</p>
          <h1 className="max-w-4xl font-display text-[clamp(5rem,15vw,13rem)] leading-[0.78] tracking-normal text-foreground">MINI<br /><span className="text-transparent [-webkit-text-stroke:2px_var(--color-foreground)]">KERUMI</span></h1>
          <div className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:gap-12">
            <div>
              <p className="text-lg font-semibold uppercase sm:text-2xl">GFX Artist · Animator</p>
              <p className="mt-1 text-sm text-muted-foreground">Network Engineer by profession. Creator by passion.</p>
            </div>
            <Button asChild className="h-12 rounded-none bg-accent px-6 font-bold uppercase text-accent-foreground shadow-none hover:bg-accent/85">
              <a href="#works">View works <ArrowDown aria-hidden="true" /></a>
            </Button>
          </div>
          <p className="mt-9 inline-block border-l-4 border-secondary bg-background/80 px-4 py-2 text-sm font-semibold uppercase backdrop-blur-sm">Learning in public · Commissions currently closed</p>
        </div>
      </header>

      <section id="about" className="border-b border-border py-20 lg:py-28">
        <div className="mx-auto grid max-w-[92rem] gap-10 px-5 lg:grid-cols-[0.7fr_1.5fr] lg:px-10">
          <div><p className="text-xs font-bold uppercase text-secondary">01 / About</p><h2 className="mt-3 font-display text-6xl tracking-normal sm:text-8xl">STILL<br />CREATING.</h2></div>
          <div className="max-w-3xl self-end border-l border-primary pl-6 sm:pl-10">
            <p className="text-2xl font-medium leading-snug sm:text-4xl">Hi, I’m MiniKerumi—a GFX artist and aspiring animator who creates for the joy of learning.</p>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">I’m always experimenting, practicing, and finding something new to love in every piece I make. Outside of art, I’m a network engineer with a Bachelor of Science in Information Technology, specializing in Network Technology.</p>
          </div>
        </div>
      </section>

      <section id="works" className="py-20 lg:py-28">
        <div className="mx-auto max-w-[92rem] px-5 lg:px-10">
          <div className="mb-10 flex items-end justify-between border-b border-border pb-5">
            <div><p className="text-xs font-bold uppercase text-primary">02 / Selected Works</p><h2 className="mt-2 font-display text-6xl tracking-normal sm:text-8xl">FRAME BY FRAME</h2></div>
            <span className="hidden text-sm font-semibold text-muted-foreground sm:block">06 PIECES / PERSONAL STUDIES</span>
          </div>
          <div className="grid auto-rows-[18rem] grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[22rem]">
            {works.map((work, index) => (
              <article key={work.title} className={`group relative overflow-hidden border border-border bg-card ${work.span}`}>
                <img src={work.src} alt={work.alt} loading={index > 1 ? "lazy" : "eager"} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-background via-background/75 to-transparent p-5 pt-20">
                  <div><p className="text-xs font-semibold uppercase text-primary">{work.tag}</p><h3 className="font-display text-3xl tracking-normal">{work.title}</h3></div>
                  <Button variant="outline" size="icon" onClick={() => setActiveWork(work)} aria-label={`Open ${work.title}`} className="rounded-none border-foreground/50 bg-background/70 hover:bg-primary hover:text-primary-foreground"><Expand /></Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="tools" className="border-y border-border bg-card py-20">
        <div className="mx-auto grid max-w-[92rem] gap-12 px-5 md:grid-cols-2 lg:px-10">
          <div><p className="text-xs font-bold uppercase text-secondary">03 / Practice & Tools</p><h2 className="mt-3 font-display text-6xl tracking-normal sm:text-8xl">BUILT TO<br />LEARN.</h2></div>
          <div className="self-end">
            <p className="max-w-xl text-xl leading-relaxed">Every piece is a personal study in composition, posing, lighting, and atmosphere—made while learning and enjoying the process.</p>
            <div className="mt-8 flex gap-3"><span className="border border-primary px-5 py-3 font-display text-2xl text-primary">BLENDER</span><span className="border border-secondary px-5 py-3 font-display text-2xl text-secondary">GOO ENGINE</span></div>
          </div>
        </div>
      </section>

      <aside className="border-b border-border py-14">
        <div className="mx-auto max-w-[92rem] px-5 lg:px-10">
          <p className="mb-3 text-xs font-bold uppercase text-accent">Credits & Disclaimer</p>
          <p className="max-w-5xl text-sm leading-6 text-muted-foreground">All compositions, lighting, posing, and renders shown here were created by MiniKerumi. Character designs, 3D models, and related intellectual property belong to their respective owners and creators. This is a non-commercial fan portfolio created for practice and personal expression. No official affiliation or endorsement is implied.</p>
        </div>
      </aside>

      <footer className="mx-auto flex max-w-[92rem] flex-col gap-3 px-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-10"><span className="font-display text-2xl">MINIKERUMI</span><span className="text-muted-foreground">Personal, non-commercial portfolio.</span></footer>

      {activeWork && (
        <div role="dialog" aria-modal="true" aria-label={activeWork.title} onClick={() => setActiveWork(null)} className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 backdrop-blur-md">
          <div className="relative flex h-full w-full items-center justify-center" onClick={(event) => event.stopPropagation()}>
            <img src={activeWork.src} alt={activeWork.alt} className="max-h-[90vh] max-w-full object-contain" />
            <div className="absolute bottom-3 left-3 bg-background/90 px-4 py-2"><p className="text-xs uppercase text-primary">{activeWork.tag}</p><p className="font-display text-2xl">{activeWork.title}</p></div>
            <Button autoFocus variant="outline" size="icon" onClick={() => setActiveWork(null)} aria-label="Close artwork" className="absolute right-3 top-3 rounded-none bg-background"><X /></Button>
          </div>
        </div>
      )}
    </main>
  );
}
