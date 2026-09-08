import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSectionTransition } from "@/components/PanelTransition";
import { useReveal } from "@/hooks/use-reveal";

import zenara from "@/assets/zenara-light.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MiniKerumi | GFX Artist & Animator" },
      {
        name: "description",
        content:
          "Explore MiniKerumi's personal GFX and animation portfolio, created with Blender and Goo Engine.",
      },
      { property: "og:title", content: "MiniKerumi | GFX Artist & Animator" },
      {
        property: "og:description",
        content:
          "A personal collection of stylized GFX, lighting, posing, and renders by MiniKerumi.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();

  const { go } = useSectionTransition();

  return (
    <header
      id="top"
      className="relative flex min-h-[88vh] items-end overflow-hidden border-b border-border"
    >
      <img
        src={zenara}
        alt="Professor Zenara character portrait by MiniKerumi"
        className="hero-drift absolute inset-0 h-full w-full object-cover object-[64%_top]"
      />

      <div className="scanline" aria-hidden="true" />

      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/20" />

      <div className="absolute inset-x-0 top-16 h-px bg-primary/50" />

      <div
        className="relative z-10 mx-auto w-full max-w-[92rem] px-5 pb-16 pt-28 lg:px-10 lg:pb-20"
        data-reveal
      >
        <p className="mb-4 flex items-center gap-3 text-xs font-bold uppercase text-primary">
          <span className="h-px w-10 bg-primary" />
          Digital practice log · 2026
        </p>

        <h1 className="max-w-4xl font-display text-[clamp(4.5rem,12vw,10rem)] leading-[0.8] tracking-normal text-foreground">
          MINI
          <br />
          <span className="text-transparent [-webkit-text-stroke:2px_var(--color-foreground)]">
            KERUMI
          </span>
        </h1>

        <div className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:gap-12">
          <div>
            <p className="text-lg font-semibold uppercase sm:text-2xl">
              GFX Artist · Animator
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Network Engineer by profession. Creator by passion.
            </p>
          </div>

          <Button
            onClick={() => go("/works")}
            className="h-12 rounded-none bg-accent px-6 font-bold uppercase text-accent-foreground shadow-none hover:bg-accent/85"
          >
            View works <ArrowDown aria-hidden="true" />
          </Button>
        </div>

        <p className="mt-9 inline-block border-l-4 border-secondary bg-background/80 px-4 py-2 text-sm font-semibold uppercase backdrop-blur-sm">
          Learning in public · Commissions currently closed
        </p>
      </div>
    </header>
  );
}
