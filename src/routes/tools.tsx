import { createFileRoute } from "@tanstack/react-router";

import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "Practice & Tools | MiniKerumi" },
      {
        name: "description",
        content:
          "Blender and Goo Engine power MiniKerumi's personal studies in composition, posing, lighting, and atmosphere.",
      },
      { property: "og:title", content: "Practice & Tools | MiniKerumi" },
      {
        property: "og:description",
        content:
          "Built to learn: the tools and credits behind MiniKerumi's non-commercial portfolio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ToolsPage,
});

function ToolsPage() {
  useReveal();

  return (
    <>
      <section
        id="tools"
        className="border-y border-border bg-card pb-20 pt-32 lg:pt-40"
        data-reveal
      >
        <div className="mx-auto grid max-w-[92rem] gap-12 px-5 md:grid-cols-2 lg:px-10">
          <div>
            <p className="text-xs font-bold uppercase text-secondary">
              04 / Practice & Tools
            </p>

            <h2 className="mt-3 font-display text-6xl tracking-normal sm:text-8xl">
              BUILT TO
              <br />
              LEARN.
            </h2>
          </div>

          <div className="self-end">
            <p className="max-w-xl text-xl leading-relaxed">
              Every piece is a personal study in composition, posing, lighting,
              and atmosphere, made while learning and enjoying the process.
            </p>

            <div className="mt-8 flex gap-3">
              <span className="border border-primary px-5 py-3 font-display text-2xl text-primary">
                BLENDER
              </span>

              <span className="border border-secondary px-5 py-3 font-display text-2xl text-secondary">
                GOO ENGINE
              </span>
            </div>
          </div>
        </div>
      </section>

      <aside className="border-b border-border py-14" data-reveal>
        <div className="mx-auto max-w-[92rem] px-5 lg:px-10">
          <p className="mb-3 text-xs font-bold uppercase text-accent">
            Credits & Disclaimer
          </p>

          <p className="max-w-5xl text-sm leading-6 text-muted-foreground">
            All compositions, lighting, posing, and renders shown here were
            created by MiniKerumi. None of my works use or will ever use AI —
            every piece is hand-crafted through manual composition, lighting,
            and rendering. Character designs, 3D models, and related
            intellectual property belong to their respective owners and
            creators. This is a non-commercial fan portfolio created for
            practice and personal expression. No official affiliation or
            endorsement is implied.
          </p>
        </div>
      </aside>
    </>
  );
}
