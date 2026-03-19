import type { Metadata } from "next";
import { ContactHero } from "@/components/sections/contact/contact-hero";
import { ContactInfo } from "@/components/sections/contact/contact-info";

export const metadata: Metadata = {
  title: "Contact | Jaspire",
  description:
    "Start your next project with Jaspire. Get in touch for web development, SEO, and social media management.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactInfo />
    </>
  );
}
