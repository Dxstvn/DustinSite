"use client";

import { useEffect, useState } from "react";

interface LocationTagProps {
  city: string;
  country: string;
  timezone: string;
}

export function LocationTag({ city, country, timezone }: LocationTagProps) {
  const [time, setTime] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: timezone,
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      );
    };
    update();
    const interval = setInterval(update, 30_000);
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div
      className="inline-flex items-center gap-2.5 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Pulsing dot */}
      <span className="relative flex size-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex size-2.5 rounded-full bg-green-500" />
      </span>

      {/* City text with swap animation */}
      <span className="relative overflow-hidden text-sm text-[var(--text-secondary)]">
        <span
          className="inline-block transition-all duration-300"
          style={{
            transform: isHovered ? "translateY(-100%)" : "translateY(0)",
            opacity: isHovered ? 0 : 1,
          }}
        >
          {city}, {country}
        </span>
        <span
          className="absolute left-0 top-0 inline-block whitespace-nowrap font-mono text-xs tracking-wider transition-all duration-300"
          style={{
            transform: isHovered ? "translateY(0)" : "translateY(100%)",
            opacity: isHovered ? 1 : 0,
          }}
        >
          {time} local time
        </span>
      </span>
    </div>
  );
}
