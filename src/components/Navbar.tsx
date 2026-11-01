import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
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
    const onScroll = () => setScrolled(window.scrollY > 20);
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
          ? "border-b border-white/10 bg-[#073638]/90 shadow-lg backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-6 sm:px-8">
        {/* Left: LIWEB Solutions logo */}
        <div className="flex shrink-0 items-center">
          <a
            href="#home"
            aria-label="LIWEB Solutions — home"
            onClick={() => setOpen(false)}
            className="flex items-center transition-opacity hover:opacity-95"
          >
            <Logo tone="light" />
          </a>
        </div>

        {/* Center: Main navigation links */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center justify-center gap-7 lg:flex xl:gap-8"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[14.5px] font-medium text-white/80 transition-colors duration-200 hover:text-sun"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Phone number + Yellow Get Started button */}
        <div className="hidden shrink-0 items-center gap-5 lg:flex">
          <a
            href={PHONE_TEL}
            className="inline-flex items-center gap-2 text-[14px] font-medium text-white/80 transition-colors duration-200 hover:text-sun"
          >
            <Phone className="size-3.5 text-sun" />
            <span>{PHONE_DISPLAY}</span>
          </a>
          <a href="#contact" className="btn-sun !px-5 !py-2.5 text-sm">
            Get Started
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid size-10 place-items-center rounded-xl border border-white/20 bg-white/5 text-white transition-colors hover:bg-white/10 lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-white/10 bg-[#073638]/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="space-y-1 px-6 py-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-base font-medium text-white/90 transition-colors hover:bg-white/5 hover:text-sun"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-3 border-t border-white/10 px-6 py-5">
              <a
                href={PHONE_TEL}
                className="flex items-center justify-center gap-2 text-sm font-medium text-white/85 transition-colors hover:text-sun"
              >
                <Phone className="size-4 text-sun" />
                <span>{PHONE_DISPLAY}</span>
              </a>
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}