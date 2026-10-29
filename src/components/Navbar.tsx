import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Logo } from "@/components/Logo";
import {
  NAV_LINKS,
  PHONE_DISPLAY,
  PHONE_TEL,
  whatsappUrl,
} from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-white/10 bg-teal/90 shadow-lg backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <a href="#home" aria-label="LIWEB Solutions — home" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-semibold text-white/85 transition-colors hover:text-sun"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={PHONE_TEL} className="text-sm font-semibold text-white/70 transition-colors hover:text-sun">
            {PHONE_DISPLAY}
          </a>
          <a href="#contact" className="btn-sun !px-5 !py-2 text-sm">
            Get Started
          </a>
        </div>

        {/* Mobile controls */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid size-10 place-items-center rounded-lg border border-white/20 text-white lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-white/10 bg-teal/95 backdrop-blur-md lg:hidden"
          >
            <ul className="space-y-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base font-semibold text-white/90 transition-colors hover:bg-white/5 hover:text-sun"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 border-t border-white/10 px-4 py-4">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-sun w-full text-center text-sm"
              >
                Get Started
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost-light w-full text-center text-sm"
              >
                <MessageCircle className="size-4" />
                Chat on WhatsApp
              </a>
              <a
                href={PHONE_TEL}
                className="text-center text-sm font-semibold text-white/70"
              >
                {PHONE_DISPLAY}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
