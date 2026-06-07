import {
  Heading,
  Hr,
  Link,
  Section,
  Text,
} from "@react-email/components";
import { EmailLayout } from "./_shared/email-layout";
import { EmailButton } from "./_shared/email-button";
import { StatusBadge } from "./_shared/status-badge";
import {
  colors,
  baseStyles,
  fontStack,
} from "./_shared/constants";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface LineItem {
  description: string;
  amount: string;
}

interface InvoiceEmailProps {
  invoiceNumber: string;
  amountDue: string;
  dueDate: string;
  projectTitle: string;
  lineItems: LineItem[];
  subtotal: string;
  tax?: string;
  total: string;
  paymentUrl: string;
  pdfUrl?: string;
  status: "pending" | "paid" | "overdue";
  clientFirstName: string;
  teamLeadEmail: string;
  nextPaymentAmount?: string;
  nextPaymentDate?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function InvoiceEmail({
  invoiceNumber,
  amountDue,
  dueDate,
  projectTitle,
  lineItems,
  subtotal,
  tax,
  total,
  paymentUrl,
  pdfUrl,
  status,
  clientFirstName,
  teamLeadEmail,
  nextPaymentAmount,
  nextPaymentDate,
}: InvoiceEmailProps) {
  return (
    <EmailLayout
      preview={
        status === "paid"
          ? `Payment received for Invoice #${invoiceNumber} — thank you.`
          : `Invoice #${invoiceNumber} — ${total} ${status === "overdue" ? "(overdue)" : `due ${dueDate}`}`
      }
      headerLabel="Invoice"
      footerVariant="minimal"
    >
      {/* Status-specific heading */}
      {status === "pending" && (
        <>
          <div style={headingRow}>
            <Heading style={{ ...baseStyles.heading, display: "inline" }}>
              Invoice #{invoiceNumber}
            </Heading>
            <span style={badgeInline}>
              <StatusBadge status="due" label={`Due ${dueDate}`} />
            </span>
          </div>
          <Text style={baseStyles.subheading}>
            Hi {clientFirstName}, here's the invoice for {projectTitle}. Payment
            details are below.
          </Text>
        </>
      )}

      {status === "paid" && (
        <>
          <Heading style={baseStyles.heading}>Payment received.</Heading>
          <div style={paidRow}>
            <span style={greenCheck}>&#10003;</span>
            <span style={paidAmount}>{total}</span>
            <span style={badgeInline}>
              <StatusBadge status="paid" />
            </span>
          </div>
          <Text style={baseStyles.subheading}>
            Thank you, {clientFirstName}. Your payment for Invoice #
            {invoiceNumber} ({projectTitle}) has been processed.
          </Text>
        </>
      )}

      {status === "overdue" && (
        <>
          <div style={headingRow}>
            <Heading style={{ ...baseStyles.heading, display: "inline" }}>
              Payment overdue.
            </Heading>
            <span style={badgeInline}>
              <StatusBadge status="overdue" />
            </span>
          </div>
          <Text style={baseStyles.subheading}>
            Hi {clientFirstName}, Invoice #{invoiceNumber} for {projectTitle}{" "}
            was due on {dueDate} and remains unpaid. We'd appreciate your prompt
            attention.
          </Text>
        </>
      )}

      {/* Invoice Details Table */}
      <Section style={invoiceCard}>
        {/* Header Row */}
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          role="presentation"
        >
          <tr style={tableHeaderRow}>
            <td style={tableHeaderLeft}>
              <Text style={tableHeaderText}>Description</Text>
            </td>
            <td style={tableHeaderRight}>
              <Text style={tableHeaderText}>Amount</Text>
            </td>
          </tr>

          {/* Line Items */}
          {lineItems.map((item, i) => (
            <tr key={i} style={lineItemRow}>
              <td style={lineItemDescCell}>
                <Text style={lineItemDesc}>{item.description}</Text>
              </td>
              <td style={lineItemAmountCell}>
                <Text style={lineItemAmount}>{item.amount}</Text>
              </td>
            </tr>
          ))}

          {/* Subtotal */}
          <tr style={subtotalRow}>
            <td>
              <Text style={summaryLabel}>Subtotal</Text>
            </td>
            <td style={alignRight}>
              <Text style={summaryValue}>{subtotal}</Text>
            </td>
          </tr>

          {/* Tax (optional) */}
          {tax && (
            <tr>
              <td>
                <Text style={summaryLabel}>Tax</Text>
              </td>
              <td style={alignRight}>
                <Text style={summaryValue}>{tax}</Text>
              </td>
            </tr>
          )}

          {/* Total */}
          <tr style={totalRow}>
            <td>
              <Text style={totalLabel}>Total</Text>
            </td>
            <td style={alignRight}>
              <Text style={totalValue}>{total}</Text>
            </td>
          </tr>
        </table>
      </Section>

      {/* Status-specific CTAs */}
      {status === "pending" && (
        <>
          <EmailButton href={paymentUrl}>Pay Now</EmailButton>
          <Text style={bankNote}>
            Prefer bank transfer?{" "}
            <Link href={`mailto:${teamLeadEmail}`} style={baseStyles.link}>
              Contact us
            </Link>{" "}
            for wire details.
          </Text>
          {pdfUrl && (
            <EmailButton href={pdfUrl} variant="secondary">
              Download PDF
            </EmailButton>
          )}
        </>
      )}

      {status === "paid" && (
        <>
          {pdfUrl && (
            <EmailButton href={pdfUrl} variant="secondary">
              Download Receipt
            </EmailButton>
          )}
          {nextPaymentAmount && nextPaymentDate && (
            <>
              <Hr style={baseStyles.hr} />
              <Text style={baseStyles.bodyText}>
                Your next payment of{" "}
                <strong>{nextPaymentAmount}</strong> is scheduled for{" "}
                <strong>{nextPaymentDate}</strong>. We'll send a reminder
                beforehand.
              </Text>
            </>
          )}
        </>
      )}

      {status === "overdue" && (
        <>
          <EmailButton href={paymentUrl}>Pay Now</EmailButton>
          <Text style={overdueNote}>
            If there's an issue with this invoice or you need to discuss payment
            terms, please{" "}
            <Link href={`mailto:${teamLeadEmail}`} style={baseStyles.link}>
              reach out to us
            </Link>
            . We're happy to work something out.
          </Text>
        </>
      )}
    </EmailLayout>
  );
}

// ---------------------------------------------------------------------------
// Preview Props (pending variant by default)
// ---------------------------------------------------------------------------

InvoiceEmail.PreviewProps = {
  invoiceNumber: "INV-2026-0042",
  amountDue: "$12,250.00",
  dueDate: "April 1, 2026",
  projectTitle: "Meridian Ventures Web Redesign",
  lineItems: [
    { description: "Website Design & Development", amount: "$9,500.00" },
    { description: "SEO Audit & Technical Optimization", amount: "$1,800.00" },
    { description: "Content Strategy & Copywriting", amount: "$950.00" },
  ],
  subtotal: "$12,250.00",
  tax: "$0.00",
  total: "$12,250.00",
  paymentUrl: "https://jaspire.co/pay/inv_2026_0042",
  pdfUrl: "https://jaspire.co/invoices/inv_2026_0042.pdf",
  status: "pending",
  clientFirstName: "Sarah",
  teamLeadEmail: "dustin@jaspire.co",
  nextPaymentAmount: "$12,250.00",
  nextPaymentDate: "May 1, 2026",
} satisfies InvoiceEmailProps;

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const headingRow = {
  marginBottom: "8px",
};

const badgeInline = {
  marginLeft: "12px",
  verticalAlign: "middle" as const,
};

const paidRow = {
  marginBottom: "16px",
};

const greenCheck = {
  fontSize: "20px",
  color: colors.accentGreen,
  fontWeight: "700" as const,
  marginRight: "8px",
  verticalAlign: "middle" as const,
};

const paidAmount = {
  fontSize: "22px",
  fontWeight: "700" as const,
  color: colors.textPrimary,
  fontFamily: fontStack,
  verticalAlign: "middle" as const,
  marginRight: "12px",
};

const invoiceCard = {
  backgroundColor: colors.surfaceWarm,
  borderRadius: "8px",
  padding: "20px 24px",
  margin: "16px 0",
};

const tableHeaderRow = {
  borderBottom: `1px solid ${colors.borderWarm}`,
};

const tableHeaderLeft = {
  paddingBottom: "8px",
};

const tableHeaderRight = {
  paddingBottom: "8px",
  textAlign: "right" as const,
};

const tableHeaderText = {
  fontSize: "11px",
  fontWeight: "600" as const,
  color: colors.textTertiary,
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  margin: "0",
};

const lineItemRow = {
  borderBottom: `1px solid ${colors.borderLight}`,
};

const lineItemDescCell = {
  padding: "12px 0",
};

const lineItemAmountCell = {
  padding: "12px 0",
  textAlign: "right" as const,
};

const lineItemDesc = {
  fontSize: "14px",
  color: colors.textPrimary,
  margin: "0",
  lineHeight: "1.5",
};

const lineItemAmount = {
  fontSize: "14px",
  color: colors.textPrimary,
  margin: "0",
  lineHeight: "1.5",
  fontWeight: "500" as const,
};

const subtotalRow = {
  borderTop: `1px solid ${colors.borderLight}`,
};

const summaryLabel = {
  fontSize: "13px",
  color: colors.textSecondary,
  margin: "8px 0 4px",
  lineHeight: "1.5",
};

const summaryValue = {
  fontSize: "13px",
  color: colors.textPrimary,
  margin: "8px 0 4px",
  lineHeight: "1.5",
  textAlign: "right" as const,
};

const totalRow = {
  borderTop: `2px solid ${colors.textPrimary}`,
};

const totalLabel = {
  fontSize: "15px",
  fontWeight: "700" as const,
  color: colors.textPrimary,
  margin: "12px 0 4px",
  lineHeight: "1.5",
};

const totalValue = {
  fontSize: "18px",
  fontWeight: "700" as const,
  color: colors.textPrimary,
  fontFamily: fontStack,
  margin: "10px 0 4px",
  lineHeight: "1.5",
  textAlign: "right" as const,
};

const alignRight = {
  textAlign: "right" as const,
};

const bankNote = {
  fontSize: "13px",
  color: colors.textTertiary,
  textAlign: "center" as const,
  margin: "0 0 8px",
  lineHeight: "1.6",
};

const overdueNote = {
  fontSize: "14px",
  color: colors.textSecondary,
  textAlign: "center" as const,
  margin: "0",
  lineHeight: "1.6",
};
