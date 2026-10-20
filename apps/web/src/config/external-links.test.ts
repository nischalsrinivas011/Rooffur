import { describe, expect, it } from "vitest";
import {
  parseContactEmail,
  parseContactEmails,
  parseWhatsAppUrl,
  qrMatchesInvite,
} from "./external-links";

describe("parseWhatsAppUrl", () => {
  it.each([
    "https://chat.whatsapp.com/AbCdEf123",
    "https://wa.me/919999999999",
    "https://whatsapp.com/channel/abc",
    "https://www.whatsapp.com/channel/abc",
  ])("accepts official https WhatsApp links: %s", (url) => {
    expect(parseWhatsAppUrl(url)).toBe(new URL(url).toString());
  });

  it("trims surrounding whitespace", () => {
    expect(parseWhatsAppUrl("  https://chat.whatsapp.com/Abc  ")).toBe(
      "https://chat.whatsapp.com/Abc",
    );
  });

  it.each([
    undefined,
    "",
    "   ",
    "not a url",
    "http://chat.whatsapp.com/Abc", // not https
    "https://chat.whatsapp.com.evil.example/Abc", // look-alike host
    "https://evil.example/?u=chat.whatsapp.com",
    "javascript:alert(1)",
  ])("rejects missing, insecure or non-WhatsApp values: %s", (value) => {
    expect(parseWhatsAppUrl(value)).toBeNull();
  });
});

describe("parseContactEmail", () => {
  it("accepts a plain address", () => {
    expect(parseContactEmail(" hello@rooffur.example ")).toBe("hello@rooffur.example");
  });

  it.each([undefined, "", "not-an-email", "a@b", "a@b.com,c@d.com", "a b@c.com"])(
    "rejects invalid values: %s",
    (value) => {
      expect(parseContactEmail(value)).toBeNull();
    },
  );
});

describe("qrMatchesInvite", () => {
  it("matches only the invite the QR image encodes, ignoring share-tracking params", () => {
    expect(qrMatchesInvite("https://chat.whatsapp.com/JuNCTQgHaUnLwkVIJ3LrLl")).toBe(true);
    expect(qrMatchesInvite("https://chat.whatsapp.com/JuNCTQgHaUnLwkVIJ3LrLl?s=cl&p=a")).toBe(true);
    expect(qrMatchesInvite("https://chat.whatsapp.com/SomeOtherInvite")).toBe(false);
    expect(qrMatchesInvite("https://wa.me/919999999999")).toBe(false);
    expect(qrMatchesInvite(null)).toBe(false);
  });
});

describe("parseContactEmails", () => {
  it("parses a comma-separated list, trimming, dropping invalid entries and duplicates", () => {
    expect(
      parseContactEmails(" a@rooffur.example, b@rooffur.example ,not-an-email,a@rooffur.example"),
    ).toEqual(["a@rooffur.example", "b@rooffur.example"]);
  });

  it("returns an empty list when nothing valid is configured", () => {
    expect(parseContactEmails(undefined)).toEqual([]);
    expect(parseContactEmails(" , ")).toEqual([]);
  });
});
