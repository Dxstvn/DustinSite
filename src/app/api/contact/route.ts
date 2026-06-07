import { NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/components";
import ContactNotification from "@/emails/contact-notification";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured");
  return new Resend(apiKey);
}

interface ContactFormData {
  services: string[];
  name: string;
  email: string;
  budget: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    const servicesText =
      body.services.length > 0
        ? body.services
            .map((s) =>
              s
                .replace(/-/g, " ")
                .replace(/(^|\s)\S/g, (l) => l.toUpperCase()),
            )
            .join(", ")
        : "Not specified";

    const html = await render(
      ContactNotification({
        name: body.name,
        email: body.email,
        services: servicesText,
        budget: body.budget || "Not specified",
        message: body.message,
      }),
    );

    const resend = getResendClient();
    await resend.emails.send({
      from: "Jaspire Contact <onboarding@resend.dev>",
      to: ["hello@jaspire.co"],
      replyTo: body.email,
      subject: `New project inquiry from ${body.name}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}
