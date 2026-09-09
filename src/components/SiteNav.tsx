import { TransitionLink, type SectionPath } from "@/components/PanelTransition";

const links: { to: SectionPath; label: string }[] = [
  { to: "/about", label: "About" },
  { to: "/works", label: "Works" },
  { to: "/animation", label: "Animation" },
  { to: "/tools", label: "Tools" },
];

export function SiteNav() {
  return (
    <nav
      aria-label="Main navigation"
      className="fixed inset-x-0 top-0 z-30 border-b border-foreground/15 bg-background/70 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-[92rem] items-center justify-between px-5 lg:px-10">
        <TransitionLink
          to="/"
          className="font-display text-2xl tracking-normal text-foreground"
        >
          <span>
            MINI<span className="text-primary">KERUMI</span>
          </span>
        </TransitionLink>

        <div className="hidden items-center gap-7 text-sm font-semibold uppercase md:flex">
          {links.map((link) => (
            <TransitionLink
              key={link.to}
              to={link.to}
              className="transition-colors hover:text-primary"
              activeClassName="text-primary"
            >
              {link.label}
            </TransitionLink>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold uppercase md:hidden">
          {links.map((link) => (
            <TransitionLink
              key={link.to}
              to={link.to}
              className="transition-colors hover:text-primary"
              activeClassName="text-primary"
            >
              {link.label}
            </TransitionLink>
          ))}
        </div>


        <span className="hidden border border-accent/70 bg-accent px-3 py-1 text-xs font-bold uppercase text-accent-foreground sm:inline-block">
          Personal Portfolio
        </span>

      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="mx-auto mb-28 flex max-w-[92rem] flex-col gap-3 px-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-10">
      <span className="font-display text-2xl">MINIKERUMI</span>

      <span className="text-muted-foreground">
        Personal, non-commercial portfolio.
      </span>
    </footer>
  );
}
