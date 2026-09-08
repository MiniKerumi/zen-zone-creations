import { createFileRoute } from "@tanstack/react-router";

import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About MiniKerumi | Still Creating" },
      {
        name: "description",
        content:
          "MiniKerumi is a GFX artist and aspiring animator, and a network engineer specializing in network technology.",
      },
      { property: "og:title", content: "About MiniKerumi | Still Creating" },
      {
        property: "og:description",
        content:
          "A GFX artist and aspiring animator who creates for the joy of learning.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  useReveal();

  return (
    <section
      id="about"
      className="border-b border-border pb-20 pt-32 lg:pb-28 lg:pt-40"
      data-reveal
    >
      <div className="mx-auto grid max-w-[92rem] gap-10 px-5 lg:grid-cols-[0.7fr_1.5fr] lg:px-10">
        <div>
          <p className="text-xs font-bold uppercase text-secondary">
            01 / About
          </p>

          <h2 className="mt-3 font-display text-6xl tracking-normal sm:text-8xl">
            STILL
            <br />
            CREATING.
          </h2>
        </div>

        <div className="max-w-3xl self-end border-l border-primary pl-6 sm:pl-10">
          <p className="text-2xl font-medium leading-snug sm:text-4xl">
            Hi, I’m MiniKerumi—a GFX artist and aspiring animator who creates
            for the joy of learning.
          </p>

          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            I’m always experimenting, practicing, and finding something new to
            love in every piece I make. Outside of art, I’m a network engineer
            with a Bachelor of Science in Information Technology, specializing
            in Network Technology.
          </p>
        </div>
      </div>
    </section>
  );
}
