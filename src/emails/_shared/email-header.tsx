import { Section, Text } from "@react-email/components";
import { colors } from "./constants";

interface EmailHeaderProps {
  /** Optional right-aligned label (e.g., "Case Study", "March 2026") */
  label?: string;
}

export function EmailHeader({ label }: EmailHeaderProps) {
  return (
    <Section style={{ marginBottom: "32px" }}>
      <table width="100%" cellPadding="0" cellSpacing="0" role="presentation">
        <tr>
          <td>
            <Text style={wordmark}>jaspire</Text>
          </td>
          {label && (
            <td style={{ textAlign: "right" as const, verticalAlign: "bottom" }}>
              <Text style={labelStyle}>{label}</Text>
            </td>
          )}
        </tr>
      </table>
      {/* Purple accent stripe */}
      <div
        style={{
          width: "40px",
          height: "2px",
          backgroundColor: colors.brandPurple,
          marginTop: "8px",
        }}
      />
    </Section>
  );
}

const wordmark = {
  fontSize: "20px",
  fontWeight: "700" as const,
  color: colors.textPrimary,
  letterSpacing: "-0.02em",
  margin: "0",
  lineHeight: "1",
};

const labelStyle = {
  fontSize: "11px",
  fontWeight: "600" as const,
  color: colors.textTertiary,
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  margin: "0",
  lineHeight: "1",
};
