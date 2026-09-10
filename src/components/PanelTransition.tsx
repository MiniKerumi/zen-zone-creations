import { Link, useNavigate } from "@tanstack/react-router";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type SectionPath = "/" | "/about" | "/works" | "/animation" | "/tools";

type Phase = "idle" | "in" | "hold" | "out";

const PANEL_COUNT = 5;
const STAGGER = 55;
const PANEL_DURATION = 360;
const COVER_TIME = PANEL_DURATION + STAGGER * (PANEL_COUNT - 1);
const HOLD_TIME = 220;
const OUT_DURATION = 400;

type TransitionContextValue = {
  phase: Phase;
  /** Runs the panel transition, swapping the route while the screen is opaque. */
  go: (to: SectionPath) => void;
  isBusy: () => boolean;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function useSectionTransition() {
  const context = useContext(TransitionContext);

  if (!context) {
    throw new Error("useSectionTransition must be used inside <PanelTransition>");
  }

  return context;
}

export function PanelTransition({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("idle");
  const busy = useRef(false);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  }, []);

  useEffect(() => {
    return () => {
      clearTimers();
      busy.current = false;
      document.documentElement.classList.remove("route-transitioning");
    };
  }, [clearTimers]);

  const later = useCallback((fn: () => void, delay: number) => {
    const timer = window.setTimeout(() => {
      timers.current = timers.current.filter((activeTimer) => activeTimer !== timer);
      fn();
    }, delay);

    timers.current.push(timer);
  }, []);

  const play = useCallback(
    (swap?: () => void) => {
      if (busy.current) return;

      busy.current = true;

      clearTimers();
      document.documentElement.classList.add("route-transitioning");
      setPhase("in");

      later(() => {
        setPhase("hold");
        swap?.();
        window.scrollTo({ top: 0, behavior: "auto" });
      }, COVER_TIME);

      later(() => setPhase("out"), COVER_TIME + HOLD_TIME);

      later(
        () => {
          setPhase("idle");
          busy.current = false;
          document.documentElement.classList.remove("route-transitioning");
        },
        COVER_TIME + HOLD_TIME + OUT_DURATION,
      );
    },
    [clearTimers, later],
  );

  const go = useCallback(
    (to: SectionPath) => {
      if (busy.current) return;

      if (typeof window !== "undefined" && window.location.pathname === to) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      play(() => {
        void navigate({ to });
      });
    },
    [navigate, play],
  );

  // Browser back / forward gets the same treatment.
  useEffect(() => {
    const onPopState = () => play();

    window.addEventListener("popstate", onPopState);

    return () => window.removeEventListener("popstate", onPopState);
  }, [play]);

  return (
    <TransitionContext.Provider
      value={{ phase, go, isBusy: () => busy.current }}
    >
      {children}

      <div
        aria-hidden="true"
        className={`panel-stage ${phase !== "idle" ? "is-active" : ""} tp-${phase}`}
      >
        {Array.from({ length: PANEL_COUNT }).map((_, index) => (
          <span
            key={index}
            className={`tp-panel tp-panel-${index + 1}`}
            style={{ "--i": index } as React.CSSProperties}
          />
        ))}

        {(phase === "hold" || phase === "out") && (
          <div className="tp-stamp">
            <span className="tp-stamp-rule tp-stamp-rule-top" />
            <span className="tp-stamp-name font-display">MiniKerumi</span>
            <span className="tp-stamp-rule tp-stamp-rule-bottom" />
          </div>
        )}
      </div>
    </TransitionContext.Provider>
  );
}

/** A link that keeps normal anchor semantics but runs the transition first. */
export function TransitionLink({
  to,
  className,
  children,
  activeClassName,
}: {
  to: SectionPath;
  className?: string;
  children: ReactNode;
  activeClassName?: string;
}) {
  const { go } = useSectionTransition();

  return (
    <Link
      to={to}
      className={className}
      activeProps={{ className: activeClassName ?? "" }}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
          return;
        }

        event.preventDefault();
        go(to);
      }}
    >
      {children}
    </Link>
  );
}
