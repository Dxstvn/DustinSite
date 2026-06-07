import { Section } from "@react-email/components";
import { colors, containerRadius } from "./constants";

interface DarkCardProps {
  children: React.ReactNode;
}

export function DarkCard({ children }: DarkCardProps) {
  return (
    <Section
      style={{
        backgroundColor: colors.darkZone,
        borderRadius: containerRadius,
        padding: "32px 28px",
        margin: "16px 0",
      }}
    >
      {children}
    </Section>
  );
}
