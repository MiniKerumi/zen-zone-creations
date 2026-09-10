import { createFileRoute } from "@tanstack/react-router";

import { useReveal } from "@/hooks/use-reveal";

import sigridVideo from "@/assets/sigrid.mp4";
import sigridPoster from "@/assets/sigrid-poster.jpg";

export const Route = createFileRoute("/animation")({
  head: () => ({
    meta: [
      { title: "Animation - Sigrid | MiniKerumi" },
      {
        name: "description",
        content:
          "Sigrid, MiniKerumi's first animation test focused on timing, camera feel, and lighting mood.",
      },
      { property: "og:title", content: "Animation - Sigrid | MiniKerumi" },
      {
        property: "og:description",
        content:
          "A first motion study rendered in Blender with Goo Engine by MiniKerumi.",
      },
      { property: "og:type", content: "video.other" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AnimationPage,
});

function AnimationPage() {
  useReveal();

  return (
    <section
      id="animation"
      className="border-y border-border bg-card/60 pb-20 pt-32 lg:pb-28 lg:pt-40"
    >
      <div className="mx-auto max-w-[92rem] px-5 lg:px-10">
        <div
          className="mb-10 flex items-end justify-between border-b border-border pb-5"
          data-reveal
        >
          <div>
            <p className="text-xs font-bold uppercase text-secondary">
              03 / Animation
            </p>

            <h2 className="mt-2 font-display text-6xl tracking-normal sm:text-8xl">
              IN MOTION
            </h2>
          </div>

          <span className="hidden text-sm font-semibold text-muted-foreground sm:block">
            01 CLIP / FIRST ANIMATION
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]" data-reveal>
          <div className="art-card relative min-w-0 overflow-hidden border border-border bg-background">
            <video
              src={sigridVideo}
              poster={sigridPoster}
              controls
              loop
              muted
              playsInline
              preload="metadata"
              aria-label="Sigrid animation by MiniKerumi"
              className="aspect-video h-auto w-full object-cover"
            />
          </div>

          <div className="min-w-0 self-center border-l border-secondary pl-6">
            <p className="text-xs font-bold uppercase text-primary">
              First Animation
            </p>

            <h3 className="mt-2 font-display text-6xl tracking-normal">
              SIGRID
            </h3>

            <p className="mt-4 text-base leading-7 text-muted-foreground">
              My first animation test, focused on timing, camera feel, and
              lighting mood. Rendered in Blender with Goo Engine.
            </p>

            <div className="marquee mt-8 border-y border-border py-2">
              <div className="marquee-track gap-6 text-sm font-bold uppercase text-muted-foreground">
                {Array.from({ length: 2 }).map((_, loop) => (
                  <span key={loop} className="flex shrink-0 gap-6 pr-6">
                    <span>Sigrid</span>
                    <span className="text-primary">·</span>
                    <span>Motion Study</span>
                    <span className="text-secondary">·</span>
                    <span>Blender</span>
                    <span className="text-accent">·</span>
                    <span>Goo Engine</span>
                    <span className="text-primary">·</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
