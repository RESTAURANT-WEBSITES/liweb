import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Floating WhatsApp button — always reachable while scrolling. */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with LIWEB Solutions on WhatsApp"
      className={cn(
        "fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:scale-110",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 pulse-soft"
      />
      <MessageCircle className="relative size-7" />
    </a>
  );
}
