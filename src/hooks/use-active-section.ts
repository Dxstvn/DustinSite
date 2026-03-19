"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { portfolioProjects, type PortfolioProject } from "@/lib/constants";

export interface ActiveSectionState {
  activeSectionId: string;
  activeSectionTheme: "dark" | "light";
  activeProjectId?: string;
  activeProject?: PortfolioProject;
}

/**
 * Tracks which section is currently in view using IntersectionObserver.
 * Each section should have `data-section-id` and optionally `data-theme` attributes.
 * Portfolio cards should have `data-project-id` for the navbar branded state.
 *
 * Uses persistent ratio maps (not per-callback batches) to avoid the IO partial-update
 * bug where only changed entries fire in a callback. After modal close, observers are
 * disconnected and reconnected so IO fires fresh initial callbacks for all elements.
 */
export function useActiveSection(): ActiveSectionState {
  const pathname = usePathname();

  const [state, setState] = useState<ActiveSectionState>({
    activeSectionId: "hero",
    activeSectionTheme: "dark",
  });

  // Persistent ratio maps — survive across IO callbacks
  const sectionRatioMap = useRef<Map<Element, number>>(new Map());
  const projectRatioMap = useRef<Map<Element, number>>(new Map());

  // Ref mirror of activeSectionId so project observer can read it without stale closures
  const activeSectionRef = useRef("hero");
  activeSectionRef.current = state.activeSectionId;

  // Track the current active card element for hysteresis
  const activeCardElRef = useRef<Element | null>(null);

  // Scroll direction tracking for footer hysteresis
  const lastScrollY = useRef(0);
  const scrollDirectionRef = useRef<"up" | "down">("down");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      scrollDirectionRef.current = y >= lastScrollY.current ? "down" : "up";
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track modal state for observer reconnection
  const [modalClosed, setModalClosed] = useState(0); // increments each time modal closes

  // ─── Watch body.dataset.modalOpen for changes ────────────────────────
  useEffect(() => {
    const body = document.body;
    let wasOpen = body.dataset.modalOpen === "true";

    const observer = new MutationObserver(() => {
      const isOpen = body.dataset.modalOpen === "true";
      if (wasOpen && !isOpen) {
        // Modal just closed — trigger observer reconnect after a short delay
        // so the navbar slide-in animation has time to start
        setTimeout(() => {
          setModalClosed((c) => c + 1);
        }, 200);
      }
      wasOpen = isOpen;
    });

    observer.observe(body, {
      attributes: true,
      attributeFilter: ["data-modal-open"],
    });

    return () => observer.disconnect();
  }, []);

  // ─── Section observer ────────────────────────────────────────────────
  const handleSectionIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      // Update persistent map with new entry data
      for (const entry of entries) {
        sectionRatioMap.current.set(entry.target, entry.intersectionRatio);
      }

      // Pick the section with the highest ratio from the ENTIRE map
      let maxRatio = 0;
      let activeEl: Element | null = null;
      for (const [el, ratio] of sectionRatioMap.current) {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          activeEl = el;
        }
      }

      // On scroll-up, require a higher threshold for footer sections to stay active.
      // This makes the email navbar collapse sooner when scrolling up from the footer.
      if (
        activeEl &&
        scrollDirectionRef.current === "up" &&
        maxRatio > 0.05
      ) {
        const winnerId = (activeEl as HTMLElement).getAttribute("data-section-id") || "";
        if (
          (winnerId === "footer-cta" || winnerId === "footer") &&
          maxRatio <= 0.2
        ) {
          // Pick the next-best non-footer section
          let fallbackRatio = 0;
          let fallbackEl: Element | null = null;
          for (const [el, ratio] of sectionRatioMap.current) {
            const sid = (el as HTMLElement).getAttribute("data-section-id") || "";
            if (sid !== "footer-cta" && sid !== "footer" && ratio > fallbackRatio) {
              fallbackRatio = ratio;
              fallbackEl = el;
            }
          }
          if (fallbackEl && fallbackRatio > 0.05) {
            activeEl = fallbackEl;
            maxRatio = fallbackRatio;
          }
        }
      }

      if (activeEl && maxRatio > 0.05) {
        const el = activeEl as HTMLElement;
        const sectionId = el.getAttribute("data-section-id") || "";
        const theme =
          el.getAttribute("data-theme") === "dark" ? "dark" : "light";

        setState((prev) => {
          if (prev.activeSectionId === sectionId) return prev;
          return {
            activeSectionId: sectionId,
            activeSectionTheme: theme,
            // Clear activeProject when leaving portfolio section
            activeProjectId:
              sectionId === "portfolio" ? prev.activeProjectId : undefined,
            activeProject:
              sectionId === "portfolio" ? prev.activeProject : undefined,
          };
        });
      }
    },
    []
  );

  useEffect(() => {
    // Clear the ratio map on reconnect so stale entries don't persist
    sectionRatioMap.current.clear();
    // Reset to safe default on page change
    setState({ activeSectionId: "hero", activeSectionTheme: "dark" });

    const sections = document.querySelectorAll("[data-section-id]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(handleSectionIntersection, {
      threshold: [0, 0.05, 0.1, 0.25, 0.5, 0.75, 1],
      rootMargin: "-80px 0px -80px 0px",
    });

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [handleSectionIntersection, modalClosed, pathname]); // pathname triggers reconnect on navigation

  // ─── Project card observer ───────────────────────────────────────────
  useEffect(() => {
    // Clear the ratio map on reconnect
    projectRatioMap.current.clear();

    const cards = document.querySelectorAll("[data-project-id]");
    if (cards.length === 0) return;

    const projectObserver = new IntersectionObserver(
      (entries) => {
        // Only update project state if we're in the portfolio section
        if (activeSectionRef.current !== "portfolio") return;

        // Update persistent map
        for (const entry of entries) {
          projectRatioMap.current.set(entry.target, entry.intersectionRatio);
        }

        // Pick the card with the highest ratio from the ENTIRE map
        let maxRatio = 0;
        let bestCard: Element | null = null;
        for (const [el, ratio] of projectRatioMap.current) {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            bestCard = el;
          }
        }

        // Hysteresis: resist switching away from the current card
        const currentCard = activeCardElRef.current;
        let chosenCard: Element | null = bestCard;

        if (currentCard && bestCard && bestCard !== currentCard) {
          const currentRatio =
            projectRatioMap.current.get(currentCard) ?? 0;

          // Only switch if current card dropped below 0.1 ratio
          // OR the new card's ratio exceeds current by more than 0.15
          if (currentRatio >= 0.1 && maxRatio - currentRatio <= 0.15) {
            chosenCard = currentCard; // keep current
          }
        }

        if (chosenCard && maxRatio > 0.5) {
          const projectId =
            (chosenCard as HTMLElement).getAttribute("data-project-id") ||
            undefined;
          const project = projectId
            ? portfolioProjects.find((p) => p.id === projectId)
            : undefined;
          activeCardElRef.current = chosenCard;
          setState((prev) => {
            if (prev.activeProjectId === projectId) return prev;
            return {
              ...prev,
              activeProjectId: projectId,
              activeProject: project,
            };
          });
        } else if (maxRatio <= 0.5) {
          // No card has >50% visibility — clear active project
          activeCardElRef.current = null;
          setState((prev) => {
            if (!prev.activeProjectId) return prev;
            return {
              ...prev,
              activeProjectId: undefined,
              activeProject: undefined,
            };
          });
        }
      },
      { threshold: [0, 0.1, 0.3, 0.5, 0.65, 0.7, 0.85, 1] }
    );

    cards.forEach((card) => projectObserver.observe(card));

    return () => projectObserver.disconnect();
  }, [modalClosed, pathname]); // modalClosed + pathname trigger reconnect

  return state;
}
