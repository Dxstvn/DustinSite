import { colors, innerRadius, fontStack } from "./constants";

interface Metric {
  value: string;
  label: string;
}

interface MetricCardProps {
  metrics: Metric[];
  /** Use dark styling for dark zone containers */
  dark?: boolean;
}

export function MetricCard({ metrics, dark = false }: MetricCardProps) {
  const bg = dark ? "transparent" : colors.surfaceWarm;
  const valueColor = dark ? colors.textOnDark : colors.textPrimary;
  const labelColor = dark ? colors.textTertiaryOnDark : colors.textTertiary;

  return (
    <table
      width="100%"
      cellPadding="0"
      cellSpacing="0"
      role="presentation"
      style={{
        backgroundColor: bg,
        borderRadius: innerRadius,
        ...(dark ? {} : { padding: "24px" }),
      }}
    >
      <tr>
        {metrics.map((metric, i) => (
          <td
            key={i}
            style={{
              textAlign: "center" as const,
              verticalAlign: "top" as const,
              padding: dark ? "0 8px" : "0 4px",
              width: `${100 / metrics.length}%`,
            }}
          >
            <p
              style={{
                fontSize: "32px",
                fontWeight: "700" as const,
                color: valueColor,
                fontFamily: fontStack,
                margin: "0 0 4px",
                lineHeight: "1.2",
              }}
            >
              {metric.value}
            </p>
            <p
              style={{
                fontSize: "12px",
                color: labelColor,
                textTransform: "uppercase" as const,
                letterSpacing: "0.05em",
                margin: "0",
                lineHeight: "1.4",
              }}
            >
              {metric.label}
            </p>
          </td>
        ))}
      </tr>
    </table>
  );
}
