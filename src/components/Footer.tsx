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
    <footer className="relative border-t border-white/10 bg-[#073638] pb-12 pt-16">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_0.7fr_1fr]">
          {/* Brand */}
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#AFC2BE]">
              LIWEB Solutions designs and develops premium websites for
              businesses — from business sites and online stores to landing
              pages and redesigns.
            </p>
            <div className="mt-6 flex gap-2.5">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={`${social.label} (coming soon)`}
                  className="grid size-9 place-items-center rounded-xl border border-white/15 bg-white/5 text-xs font-semibold text-white/70 transition-all hover:border-sun hover:bg-white/10 hover:text-sun"
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
                    className="text-sm font-medium text-[#AFC2BE] transition-colors hover:text-sun"
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
                    className="text-sm font-medium text-[#AFC2BE] transition-colors hover:text-sun"
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
                  className="inline-flex items-center gap-2.5 font-semibold text-white transition-colors hover:text-sun"
                >
                  <Phone className="size-4 text-sun" />
                  <span>{PHONE_DISPLAY}</span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 text-[#AFC2BE] transition-colors hover:text-sun"
                >
                  <MessageCircle className="size-4 text-sun" />
                  <span>Chat on WhatsApp</span>
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-[#AFC2BE]">
                <Mail className="size-4 text-sun" />
                <span>hello@liwebsolutions.in</span>
              </li>
            </ul>
            <div className="mt-6">
              <a href="#pricing" className="btn-sun !px-4 !py-2 text-xs">
                View packages
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-[#AFC2BE]/60 sm:flex-row">
          <p>© {year} LIWEB Solutions. All rights reserved.</p>
          <p className="text-[#AFC2BE]/40">
            Privacy policy &amp; terms available on request.
          </p>
        </div>
      </div>
    </footer>
  );
}