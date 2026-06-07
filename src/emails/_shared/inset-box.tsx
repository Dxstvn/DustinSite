import { Section } from "@react-email/components";
import { colors, innerRadius } from "./constants";

interface InsetBoxProps {
  /** Left border accent color. Defaults to none (warm cream bg only). */
  accent?: "purple" | "orange" | "green" | "red";
  children: React.ReactNode;
}

const accentColors = {
  purple: colors.brandPurple,
  orange: colors.accentOrange,
  green: colors.accentGreen,
  red: colors.accentRed,
};

export function InsetBox({ accent, children }: InsetBoxProps) {
  return (
    <Section
      style={{
        backgroundColor: colors.surfaceWarm,
        borderRadius: innerRadius,
        padding: "20px 24px",
        margin: "16px 0",
        ...(accent && {
          borderLeft: `4px solid ${accentColors[accent]}`,
        }),
      }}
    >
      {children}
    </Section>
  );
}
