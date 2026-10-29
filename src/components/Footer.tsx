import { Logo } from "@/components/Logo";
import { MessageCircle, Phone, Mail } from "lucide-react";
import {
  NAV_LINKS,
  PHONE_DISPLAY,
  PHONE_TEL,
  SERVICES,
  whatsappUrl,
} from "@/lib/site";

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "LinkedIn", href: "#" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/10 pb-10 pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_0.7fr_1fr]">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              LIWEB Solutions designs and develops premium websites for
              businesses — from business sites and online stores to landing
              pages and redesigns.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={`${social.label} (coming soon)`}
                  className="grid size-9 place-items-center rounded-full border border-white/15 text-xs font-bold text-white/60 transition-colors hover:border-sun hover:text-sun"
                >
                  {social.label.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-sun">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/65 transition-colors hover:text-sun"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Footer services">
            <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-sun">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((service) => (
                <li key={service.title}>
                  <a
                    href="#services"
                    className="text-sm text-white/65 transition-colors hover:text-sun"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-sun">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={PHONE_TEL}
                  className="inline-flex items-center gap-2.5 font-bold text-white transition-colors hover:text-sun"
                >
                  <Phone className="size-4 text-sun" />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 text-white/65 transition-colors hover:text-sun"
                >
                  <MessageCircle className="size-4 text-sun" />
                  Chat on WhatsApp
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-white/65">
                <Mail className="size-4 text-sun" />
                hello@liwebsolutions.in
                <span className="text-[0.65rem] uppercase tracking-wider text-white/35">
                  (placeholder)
                </span>
              </li>
            </ul>
            <a href="#pricing" className="btn-sun mt-6 !px-5 !py-2.5 text-xs">
              View packages
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row">
          <p>© {year} LIWEB Solutions. All rights reserved.</p>
          <p className="text-white/35">
            Privacy policy &amp; terms available on request.
          </p>
        </div>
      </div>
    </footer>
  );
}
