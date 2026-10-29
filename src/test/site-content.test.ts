import { describe, expect, it } from "vitest";

import {
  DEFAULT_WHATSAPP_MESSAGE,
  PHONE_DISPLAY,
  PHONE_TEL,
  PLANS,
  whatsappUrl,
} from "@/lib/site";

// The pricing is taken verbatim from the owner's supplied reference; these
// tests lock the exact figures so they cannot drift silently.
describe("LIWEB pricing", () => {
  it("shows the three packages at the referenced one-time prices", () => {
    expect(PLANS.map((p) => p.name)).toEqual(["STATIC", "DYNAMIC", "PREMIUM"]);
    expect(PLANS.map((p) => p.price)).toEqual(["₹4,999", "₹9,999", "₹14,999"]);
  });

  it("shows the referenced installment options", () => {
    expect(PLANS[0]?.monthly).toBe("₹1,000 / month for 6 months");
    expect(PLANS[1]?.monthly).toBe("₹1,000 / month for 12 months");
    expect(PLANS[2]?.monthly).toBe("₹1,500 / month for 12 months");
  });

  it("features DYNAMIC as the highlighted package", () => {
    expect(PLANS.find((p) => p.featured)?.name).toBe("DYNAMIC");
  });

  it("lists the referenced feature counts", () => {
    expect(PLANS[0]?.features).toContain("Up to 5 web pages");
    expect(PLANS[1]?.features).toContain("Up to 10 web pages");
    expect(PLANS[2]?.features).toContain("Up to 15 web pages");
    expect(PLANS[2]?.features).toContain("1 year of free maintenance");
    expect(PLANS[1]?.features).toContain("Always-live background");
  });
});

describe("Contact channels", () => {
  it("exposes the owner's phone number as tel and display strings", () => {
    expect(PHONE_DISPLAY).toBe("+91 62384 26420");
    expect(PHONE_TEL).toBe("tel:+916238426420");
  });

  it("builds WhatsApp links on the correct number with a prefilled message", () => {
    const url = new URL(whatsappUrl("Hi there"));
    expect(url.protocol).toBe("https:");
    expect(url.pathname).toBe("/916238426420");
    expect(url.searchParams.get("text")).toBe("Hi there");
  });

  it("has a default WhatsApp message for cold visitors", () => {
    expect(DEFAULT_WHATSAPP_MESSAGE).toContain("LIWEB Solutions");
  });
});
