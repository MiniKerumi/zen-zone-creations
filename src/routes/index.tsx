import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, Expand, Music2, Pause, Play, SkipBack, SkipForward, Volume2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import zenara from "@/assets/zenara-light.png.asset.json";
import crimson from "@/assets/crimson-elegance.png.asset.json";
import dualSignal from "@/assets/dual-signal.png.asset.json";
import cityPair from "@/assets/city-pair.png.asset.json";
import firstGfx from "@/assets/first-gfx.png.asset.json";
import afterHours from "@/assets/after-hours.png.asset.json";
import bgmCover from "@/assets/bgm-cover.png.asset.json";
import dailyLifeLeisure from "@/assets/daily-life-leisure.mp3.asset.json";
import dailyLifeFreedom from "@/assets/daily-life-freedom.mp3.asset.json";
import reverieSerenity from "@/assets/reverie-serenity.mp3.asset.json";
import vr from "@/assets/vr.mp3.asset.json";
import hia from "@/assets/hia.mp3.asset.json";
import strivingPort from "@/assets/striving-port.mp3.asset.json";
import reveriePassion from "@/assets/reverie-passion.mp3.asset.json";
import sigridVideo from "@/assets/sigrid.mp4.asset.json";
import sigridPoster from "@/assets/sigrid-poster.jpg.asset.json";

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
  { title: "Professor Zenara", tag: "Portrait / Lighting", src: zenara.url, alt: "Professor Zenara portrait illuminated by cyan and magenta light", span: "md:col-span-2" },
  { title: "Hsin the Moon Fox", tag: "Character Study", src: crimson.url, alt: "Hsin the Moon Fox in a red, black, and white outfit", span: "md:row-span-2" },
  { title: "Mesa & Billy", tag: "Crossover Composition", src: dualSignal.url, alt: "Mesa and Billy posed together against a dark backdrop", span: "" },
  { title: "Ramielle & Wise", tag: "Cinematic Moment", src: cityPair.url, alt: "Ramielle and Wise smiling together in a softly lit city interior", span: "" },
  { title: "Trigger", tag: "First GFX / ZZZ", src: firstGfx.url, alt: "Trigger suspended above a colorful urban street", span: "md:col-span-2" },
  { title: "Nicole & Lucy", tag: "Scene Study", src: afterHours.url, alt: "Nicole and Lucy posing in a warmly lit room", span: "" },
];

const tracks = [
  { title: "Daily Life · Leisure", artist: "Sān-Z / HOYO-MiX", src: dailyLifeLeisure.url },
  { title: "Daily Life · Freedom", artist: "Sān-Z", src: dailyLifeFreedom.url },
  { title: "Reverie · Serenity", artist: "Sān-Z", src: reverieSerenity.url },
  { title: "Vr", artist: "Sān-Z", src: vr.url },
  { title: "Hia", artist: "Sān-Z", src: hia.url },
  { title: "争流口岸", artist: "Sān-Z", src: strivingPort.url },
  { title: "Reverie · Passion", artist: "Sān-Z", src: reveriePassion.url },
] as const;

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
}

function Index() {
  const [activeWork, setActiveWork] = useState<(typeof works)[number] | null>(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentTrack = tracks[trackIndex] ?? tracks[0];

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) audio.play().catch(() => setPlaying(false));
    else audio.pause();
  }, [playing, trackIndex]);

  const changeTrack = (direction: number) => {
    setTrackIndex((current) => (current + direction + tracks.length) % tracks.length);
    setCurrentTime(0);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <nav aria-label="Main navigation" className="absolute inset-x-0 top-0 z-30 border-b border-foreground/15 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[92rem] items-center justify-between px-5 lg:px-10">
          <a href="#top" className="font-display text-2xl tracking-normal text-foreground">MINI<span className="text-primary">KERUMI</span></a>
          <div className="hidden items-center gap-7 text-sm font-semibold uppercase md:flex">
            <a href="#about" className="transition-colors hover:text-primary">About</a>
            <a href="#works" className="transition-colors hover:text-primary">Works</a>
            <a href="#animation" className="transition-colors hover:text-primary">Animation</a>
            <a href="#tools" className="transition-colors hover:text-primary">Tools</a>
          </div>
          <span className="border border-accent/70 bg-accent px-3 py-1 text-xs font-bold uppercase text-accent-foreground">Personal Portfolio</span>
        </div>
      </nav>

      <header id="top" className="relative flex min-h-[92vh] items-end overflow-hidden border-b border-border">
        <img src={zenara.url} alt="Professor Zenara character portrait by MiniKerumi" className="hero-drift absolute inset-0 h-full w-full scale-100 object-cover object-[62%_22%]" />
        <div className="scanline" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/65 to-background/10" />
        <div className="absolute inset-x-0 top-16 h-px bg-primary/50" />
        <div className="relative z-10 mx-auto w-full max-w-[92rem] px-5 pb-16 pt-32 lg:px-10 lg:pb-20" data-reveal>
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

      <section id="about" className="border-b border-border py-20 lg:py-28" data-reveal>
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
          <div className="mb-10 flex items-end justify-between border-b border-border pb-5" data-reveal>
            <div><p className="text-xs font-bold uppercase text-primary">02 / Selected Works</p><h2 className="mt-2 font-display text-6xl tracking-normal sm:text-8xl">FRAME BY FRAME</h2></div>
            <span className="hidden text-sm font-semibold text-muted-foreground sm:block">06 PIECES / PERSONAL STUDIES</span>
          </div>
          <div className="grid auto-rows-[18rem] grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[22rem]">
            {works.map((work, index) => (
              <article key={work.title} data-reveal style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties} className={`art-card group relative overflow-hidden border border-border bg-card ${work.span}`}>
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

      <section id="animation" className="border-y border-border bg-card/60 py-20 lg:py-28">
        <div className="mx-auto max-w-[92rem] px-5 lg:px-10">
          <div className="mb-10 flex items-end justify-between border-b border-border pb-5" data-reveal>
            <div><p className="text-xs font-bold uppercase text-secondary">03 / Animation</p><h2 className="mt-2 font-display text-6xl tracking-normal sm:text-8xl">IN MOTION</h2></div>
            <span className="hidden text-sm font-semibold text-muted-foreground sm:block">01 CLIP / FIRST ANIMATION</span>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]" data-reveal>
            <div className="art-card relative overflow-hidden border border-border bg-background">
              <video
                src={sigridVideo.url}
                poster={sigridPoster.url}
                controls
                loop
                muted
                playsInline
                preload="metadata"
                aria-label="Sigrid animation by MiniKerumi"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="self-center border-l border-secondary pl-6">
              <p className="text-xs font-bold uppercase text-primary">First Animation</p>
              <h3 className="mt-2 font-display text-6xl tracking-normal">SIGRID</h3>
              <p className="mt-4 text-base leading-7 text-muted-foreground">My first animation test—focused on timing, camera feel, and lighting mood. Rendered in Blender with Goo Engine.</p>
              <div className="marquee mt-8 border-y border-border py-2">
                <div className="marquee-track gap-6 text-sm font-bold uppercase text-muted-foreground">
                  {Array.from({ length: 2 }).map((_, loop) => (
                    <span key={loop} className="flex shrink-0 gap-6 pr-6">
                      <span>Sigrid</span><span className="text-primary">·</span><span>Motion Study</span><span className="text-secondary">·</span><span>Blender</span><span className="text-accent">·</span><span>Goo Engine</span><span className="text-primary">·</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section id="tools" className="border-y border-border bg-card py-20" data-reveal>
        <div className="mx-auto grid max-w-[92rem] gap-12 px-5 md:grid-cols-2 lg:px-10">
          <div><p className="text-xs font-bold uppercase text-secondary">04 / Practice & Tools</p><h2 className="mt-3 font-display text-6xl tracking-normal sm:text-8xl">BUILT TO<br />LEARN.</h2></div>
          <div className="self-end">
            <p className="max-w-xl text-xl leading-relaxed">Every piece is a personal study in composition, posing, lighting, and atmosphere—made while learning and enjoying the process.</p>
            <div className="mt-8 flex gap-3"><span className="border border-primary px-5 py-3 font-display text-2xl text-primary">BLENDER</span><span className="border border-secondary px-5 py-3 font-display text-2xl text-secondary">GOO ENGINE</span></div>
          </div>
        </div>
      </section>

      <aside className="border-b border-border py-14" data-reveal>
        <div className="mx-auto max-w-[92rem] px-5 lg:px-10">
          <p className="mb-3 text-xs font-bold uppercase text-accent">Credits & Disclaimer</p>
          <p className="max-w-5xl text-sm leading-6 text-muted-foreground">All compositions, lighting, posing, and renders shown here were created by MiniKerumi. Character designs, 3D models, and related intellectual property belong to their respective owners and creators. This is a non-commercial fan portfolio created for practice and personal expression. No official affiliation or endorsement is implied.</p>
        </div>
      </aside>

      <footer className="mx-auto mb-28 flex max-w-[92rem] flex-col gap-3 px-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-10"><span className="font-display text-2xl">MINIKERUMI</span><span className="text-muted-foreground">Personal, non-commercial portfolio.</span></footer>

      <section aria-label="Background music player" className="fixed bottom-3 left-1/2 z-40 w-[calc(100%-1.5rem)] max-w-2xl -translate-x-1/2 border border-primary/60 bg-popover/95 shadow-[6px_6px_0_var(--color-secondary)] backdrop-blur-xl">
        <audio
          ref={audioRef}
          src={currentTrack.src}
          preload="metadata"
          onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
          onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
          onEnded={() => changeTrack(1)}
        />
        <div className="flex h-[76px] items-center gap-3 p-2 sm:gap-4">
          <div className={`cover-frame h-[58px] w-[58px] shrink-0 overflow-hidden border border-foreground/30 ${playing ? "is-playing" : ""}`}>
            <img src={bgmCover.url} alt="Background music cover artwork" className="h-full w-full object-cover object-center" />
            <Music2 className="absolute bottom-1 right-1 h-4 w-4 bg-background/80 p-0.5 text-accent" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <div className="min-w-0"><p className="truncate text-xs font-bold uppercase text-primary">{currentTrack.title}</p><p className="truncate text-[11px] text-muted-foreground">{currentTrack.artist} · {trackIndex + 1}/{tracks.length}</p></div>
              <span className="hidden text-[10px] tabular-nums text-muted-foreground sm:block">{formatTime(currentTime)} / {formatTime(duration)}</span>
            </div>
            <input aria-label="Seek through current track" type="range" min="0" max={duration || 0} value={currentTime} onChange={(event) => { const value = Number(event.target.value); setCurrentTime(value); if (audioRef.current) audioRef.current.currentTime = value; }} className="music-range mt-2 w-full" />
          </div>
          <div className="flex shrink-0 items-center">
            <Button variant="ghost" size="icon" onClick={() => changeTrack(-1)} aria-label="Previous track" className="rounded-none"><SkipBack /></Button>
            <Button size="icon" onClick={() => setPlaying((value) => !value)} aria-label={playing ? "Pause music" : "Play music"} className="rounded-none bg-accent text-accent-foreground hover:bg-accent/85">{playing ? <Pause /> : <Play />}</Button>
            <Button variant="ghost" size="icon" onClick={() => changeTrack(1)} aria-label="Next track" className="rounded-none"><SkipForward /></Button>
            <Volume2 className="ml-1 hidden h-4 w-4 text-muted-foreground sm:block" aria-hidden="true" />
          </div>
        </div>
      </section>

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
