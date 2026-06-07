import { colors } from "./constants";

type BadgeStatus =
  | "on-track"
  | "in-progress"
  | "completed"
  | "approved"
  | "needs-review"
  | "pending"
  | "revision-requested"
  | "overdue"
  | "blocked"
  | "paid"
  | "due";

interface StatusBadgeProps {
  status: BadgeStatus;
  /** Override the display label. Defaults to the status name. */
  label?: string;
}

const statusConfig: Record<
  BadgeStatus,
  { bg: string; color: string; label: string }
> = {
  "on-track": { bg: colors.badgeGreenBg, color: colors.accentGreen, label: "On Track" },
  "in-progress": { bg: colors.badgeBlueBg, color: colors.accentBlue, label: "In Progress" },
  completed: { bg: colors.badgeGreenBg, color: colors.accentGreen, label: "Completed" },
  approved: { bg: colors.badgeGreenBg, color: colors.accentGreen, label: "Approved" },
  "needs-review": { bg: colors.badgeOrangeBg, color: colors.accentOrange, label: "Needs Review" },
  pending: { bg: colors.badgeOrangeBg, color: colors.accentOrange, label: "Pending" },
  "revision-requested": { bg: colors.badgeOrangeBg, color: colors.accentOrange, label: "Revision Requested" },
  overdue: { bg: colors.badgeRedBg, color: colors.accentRed, label: "Overdue" },
  blocked: { bg: colors.badgeRedBg, color: colors.accentRed, label: "Blocked" },
  paid: { bg: colors.badgeGreenBg, color: colors.accentGreen, label: "Paid" },
  due: { bg: colors.badgeAmberBg, color: colors.badgeAmberText, label: "Due" },
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      style={{
        display: "inline-block",
        backgroundColor: config.bg,
        color: config.color,
        fontSize: "12px",
        fontWeight: "600" as const,
        textTransform: "uppercase" as const,
        padding: "4px 12px",
        borderRadius: "99px",
        lineHeight: "1.4",
      }}
    >
      {label ?? config.label}
    </span>
  );
}
