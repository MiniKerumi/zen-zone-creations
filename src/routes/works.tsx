import { createFileRoute } from "@tanstack/react-router";
import { Expand, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useReveal } from "@/hooks/use-reveal";
import { works, type Work } from "@/lib/works";

export const Route = createFileRoute("/works")({
  head: () => ({
    meta: [
      { title: "Selected Works | MiniKerumi" },
      {
        name: "description",
        content:
          "Six personal GFX studies by MiniKerumi covering portraits, lighting, posing, and cinematic scenes.",
      },
      { property: "og:title", content: "Selected Works | MiniKerumi" },
      {
        property: "og:description",
        content:
          "Frame by frame — six personal GFX studies rendered in Blender and Goo Engine.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WorksPage,
});

function WorksPage() {
  useReveal();

  const [activeWork, setActiveWork] = useState<Work | null>(null);

  useEffect(() => {
    if (!activeWork) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveWork(null);
    };

    window.addEventListener("keydown", closeOnEscape);

    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [activeWork]);

  return (
    <section id="works" className="pb-20 pt-32 lg:pb-28 lg:pt-40">
      <div className="mx-auto max-w-[92rem] px-5 lg:px-10">
        <div
          className="mb-10 flex items-end justify-between border-b border-border pb-5"
          data-reveal
        >
          <div>
            <p className="text-xs font-bold uppercase text-primary">
              02 / Selected Works
            </p>

            <h2 className="mt-2 font-display text-6xl tracking-normal sm:text-8xl">
              FRAME BY FRAME
            </h2>
          </div>

          <span className="hidden text-sm font-semibold text-muted-foreground sm:block">
            06 PIECES / PERSONAL STUDIES
          </span>
        </div>

        <div className="grid auto-rows-[18rem] grid-cols-1 gap-4 md:auto-rows-[22rem] md:grid-cols-3">
          {works.map((work, index) => (
            <article
              key={work.title}
              data-reveal
              style={
                { "--reveal-delay": `${index * 70}ms` } as React.CSSProperties
              }
              className={`art-card group relative overflow-hidden border border-border bg-card ${work.span}`}
            >
              <img
                src={work.src}
                alt={work.alt}
                loading={index > 1 ? "lazy" : "eager"}
                className="h-full w-full object-cover object-[center_25%] transition duration-500 group-hover:scale-[1.025]"
              />

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-background via-background/75 to-transparent p-5 pt-20">
                <div>
                  <p className="text-xs font-semibold uppercase text-primary">
                    {work.tag}
                  </p>

                  <h3 className="font-display text-3xl tracking-normal">
                    {work.title}
                  </h3>
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setActiveWork(work)}
                  aria-label={`Open ${work.title}`}
                  className="rounded-none border-foreground/50 bg-background/70 hover:bg-primary hover:text-primary-foreground"
                >
                  <Expand />
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {activeWork && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeWork.title}
          onClick={() => setActiveWork(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 backdrop-blur-md"
        >
          <div
            className="relative flex h-full w-full items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={activeWork.src}
              alt={activeWork.alt}
              className="max-h-[90vh] max-w-full object-contain"
            />

            <div className="absolute bottom-3 left-3 bg-background/90 px-4 py-2">
              <p className="text-xs uppercase text-primary">{activeWork.tag}</p>

              <p className="font-display text-2xl">{activeWork.title}</p>
            </div>

            <Button
              autoFocus
              variant="outline"
              size="icon"
              onClick={() => setActiveWork(null)}
              aria-label="Close artwork"
              className="absolute right-3 top-3 rounded-none bg-background"
            >
              <X />
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
