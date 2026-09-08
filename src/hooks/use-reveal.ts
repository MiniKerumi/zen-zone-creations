import { useEffect } from "react";

/**
 * Observes every [data-reveal] element on the current page and adds
 * `is-visible` once it scrolls into view. Re-runs on each route mount.
 */
export function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) =>
            entry.isIntersecting && entry.target.classList.add("is-visible"),
        ),
      { threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  });
}
