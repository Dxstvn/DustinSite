import { Button } from "@react-email/components";
import { colors, pillRadius } from "./constants";

interface EmailButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export function EmailButton({
  href,
  children,
  variant = "primary",
}: EmailButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <table
      width="100%"
      cellPadding="0"
      cellSpacing="0"
      role="presentation"
      style={{ margin: "24px 0" }}
    >
      <tr>
        <td align="center">
          <Button
            href={href}
            style={isPrimary ? primaryButton : secondaryButton}
          >
            {children}
          </Button>
        </td>
      </tr>
    </table>
  );
}

const primaryButton = {
  backgroundColor: colors.brandPurple,
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: "600" as const,
  padding: "14px 32px",
  borderRadius: pillRadius,
  textDecoration: "none" as const,
  display: "inline-block" as const,
};

const secondaryButton = {
  backgroundColor: "transparent",
  color: colors.textPrimary,
  fontSize: "15px",
  fontWeight: "600" as const,
  padding: "12px 30px",
  borderRadius: pillRadius,
  border: `1.5px solid ${colors.borderWarm}`,
  textDecoration: "none" as const,
  display: "inline-block" as const,
};
