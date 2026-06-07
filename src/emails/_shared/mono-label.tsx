import { Text } from "@react-email/components";
import { colors, monoStack } from "./constants";

interface MonoLabelProps {
  children: React.ReactNode;
}

export function MonoLabel({ children }: MonoLabelProps) {
  return <Text style={style}>{children}</Text>;
}

const style = {
  fontSize: "11px",
  fontFamily: monoStack,
  fontWeight: "600" as const,
  color: colors.textTertiary,
  textTransform: "uppercase" as const,
  letterSpacing: "0.2em",
  margin: "0 0 12px",
  lineHeight: "1",
};
