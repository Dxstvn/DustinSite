"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  closeAt: Date;
  className?: string;
  showIcon?: boolean;
  compact?: boolean;
}

function getTimeRemaining(closeAt: Date) {
  const now = new Date();
  const diff = closeAt.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, totalMs: diff };
}

function formatCountdown(days: number, hours: number, minutes: number, seconds: number, compact: boolean) {
  if (compact) {
    if (days > 0) return `${days}j ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m ${seconds}s`;
  }
  if (days > 0) return `Fèmen nan ${days}j ${hours}h ${minutes}m`;
  if (hours > 0) return `Fèmen nan ${hours}h ${minutes}m`;
  return `Fèmen nan ${minutes}m ${seconds}s`;
}

export function CountdownTimer({ closeAt, className, showIcon = true, compact = false }: CountdownTimerProps) {
  const [time, setTime] = useState(() => getTimeRemaining(closeAt));

  const closeAtMs = closeAt.getTime()
  useEffect(() => {
    setTime(getTimeRemaining(closeAt))
    const interval = setInterval(() => {
      setTime(getTimeRemaining(closeAt));
    }, 1000);

    return () => clearInterval(interval);
  }, [closeAtMs]);

  if (time.totalMs <= 0) {
    return (
      <span className={cn("text-sm text-danger-text font-semibold", className)}>
        {showIcon && <Clock className="inline-block size-3.5 mr-1" />}
        Fèmen
      </span>
    );
  }

  const totalHours = time.days * 24 + time.hours + time.minutes / 60;
  const isUrgent = totalHours < 1;
  const isWarning = totalHours < 6;
  const isCritical = time.hours === 0 && time.minutes < 10;

  const timerContent = (
    <>
      {showIcon && <Clock className="inline-block size-3.5" />}
      <span suppressHydrationWarning>
        {formatCountdown(time.days, time.hours, time.minutes, time.seconds, compact)}
      </span>
    </>
  );

  if (isUrgent) {
    return (
      <span className={cn("inline-flex", className)}>
        <span
          className={cn(
            "bg-danger-muted/30 rounded px-1.5 py-0.5 inline-flex items-center gap-1 text-sm tabular-nums text-danger-text",
            isUrgent && "animate-pulse",
            isCritical && "text-lg font-bold",
          )}
        >
          {timerContent}
        </span>
      </span>
    );
  }

  if (isWarning) {
    return (
      <span className={cn("inline-flex", className)}>
        <span
          className="bg-warning-muted/30 rounded px-1.5 py-0.5 inline-flex items-center gap-1 text-sm tabular-nums text-warning"
        >
          {timerContent}
        </span>
      </span>
    );
  }

  return (
    <span
      className={cn(
        "text-sm tabular-nums inline-flex items-center gap-1 text-text-muted",
        className
      )}
    >
      {timerContent}
    </span>
  );
}
