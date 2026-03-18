"use client";

import { useEffect, useCallback } from "react";
import { motion as m, AnimatePresence } from "motion/react";
import { X, ExternalLink } from "lucide-react";

export interface DemoProject {
  id: string;
  title: string;
  domain: string;
  demoUrl: string;
  liveUrl?: string;
  techStack: string[];
  description: string;
}

interface PortfolioDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: DemoProject | null;
}

export function PortfolioDemoModal({
  isOpen,
  onClose,
  project,
}: PortfolioDemoModalProps) {
  // Lock body scroll & signal modal state to other components (e.g. navbar)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.dataset.modalOpen = "true";
    } else {
      document.body.style.overflow = "";
      delete document.body.dataset.modalOpen;
    }
    return () => {
      document.body.style.overflow = "";
      delete document.body.dataset.modalOpen;
    };
  }, [isOpen]);

  // Close on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        >
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Browser frame */}
          <m.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="relative flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-[#1a1a1a] shadow-2xl shadow-black/50"
          >
            {/* macOS window chrome */}
            <div className="flex items-center gap-3 border-b border-white/[0.06] bg-[#1a1a1a] px-4 py-3">
              {/* Traffic light dots */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="size-3 rounded-full bg-[#ff5f57] transition-opacity hover:opacity-80"
                  aria-label="Close"
                />
                <div className="size-3 rounded-full bg-[#febc2e]" />
                <div className="size-3 rounded-full bg-[#28c840]" />
              </div>

              {/* URL bar */}
              <div className="mx-4 flex flex-1 items-center justify-center">
                <div className="flex max-w-md items-center gap-2 rounded-lg bg-white/[0.06] px-4 py-1.5">
                  <svg
                    className="size-3 text-white/30"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span className="text-xs text-white/50">
                    {project.domain}
                  </span>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="flex size-7 items-center justify-center rounded-md text-white/40 transition-colors hover:bg-white/[0.08] hover:text-white"
                aria-label="Close preview"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* iframe content area */}
            <div className="flex-1 bg-white">
              <iframe
                src={project.demoUrl}
                className="h-full w-full border-0"
                title={`${project.title} demo`}
                sandbox="allow-scripts allow-same-origin allow-popups"
              />
            </div>

            {/* Project info bar */}
            <div className="flex items-center justify-between border-t border-white/[0.06] bg-[#1a1a1a] px-4 py-3">
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-semibold text-white">
                  {project.title}
                </h3>
                <div className="hidden items-center gap-1.5 md:flex">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[10px] font-medium text-white/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-xs text-white/40 transition-colors hover:text-white"
                >
                  Visit Live Site
                  <ExternalLink className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              )}
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
