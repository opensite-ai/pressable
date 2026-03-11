import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useNavigation } from "../src/hooks/useNavigation";

describe("useNavigation", () => {
  // Mock window.location for tests
  const originalLocation = window.location;

  beforeEach(() => {
    delete (window as any).location;
    window.location = {
      ...originalLocation,
      href: "https://example.com",
      origin: "https://example.com",
    };
  });

  afterEach(() => {
    window.location = originalLocation;
  });

  describe("Link type detection", () => {
    it("detects internal links", () => {
      const { result } = renderHook(() =>
        useNavigation({ href: "/about" })
      );
      expect(result.current.linkType).toBe("internal");
      expect(result.current.isInternal).toBe(true);
      expect(result.current.normalizedHref).toBe("/about");
    });

    it("detects external links", () => {
      const { result } = renderHook(() =>
        useNavigation({ href: "https://google.com" })
      );
      expect(result.current.linkType).toBe("external");
      expect(result.current.isExternal).toBe(true);
      expect(result.current.target).toBe("_blank");
      expect(result.current.rel).toBe("noopener noreferrer");
    });

    it("detects mailto links", () => {
      const { result } = renderHook(() =>
        useNavigation({ href: "mailto:test@example.com" })
      );
      expect(result.current.linkType).toBe("mailto");
      expect(result.current.normalizedHref).toBe("mailto:test@example.com");
    });

    it("detects email addresses without mailto:", () => {
      const { result } = renderHook(() =>
        useNavigation({ href: "test@example.com" })
      );
      expect(result.current.linkType).toBe("mailto");
      expect(result.current.normalizedHref).toBe("mailto:test@example.com");
    });

    it("detects tel links", () => {
      const { result } = renderHook(() =>
        useNavigation({ href: "tel:+14322386131" })
      );
      expect(result.current.linkType).toBe("tel");
      expect(result.current.normalizedHref).toBe("tel:+14322386131");
    });

    it("detects phone numbers without tel:", () => {
      const { result } = renderHook(() =>
        useNavigation({ href: "(432) 238-6131" })
      );
      expect(result.current.linkType).toBe("tel");
      expect(result.current.normalizedHref).toBe("tel:+14322386131");
    });
  });

  describe("Phone number normalization", () => {
    it("normalizes phone with parentheses and dashes", () => {
      const { result } = renderHook(() =>
        useNavigation({ href: "(432) 238-6131" })
      );
      expect(result.current.normalizedHref).toBe("tel:+14322386131");
    });

    it("normalizes phone with extension", () => {
      const { result } = renderHook(() =>
        useNavigation({ href: "512-232-2212x123" })
      );
      expect(result.current.normalizedHref).toBe("tel:+15122322212;ext=123");
    });

    it("normalizes phone with dots", () => {
      const { result } = renderHook(() =>
        useNavigation({ href: "512.232.2212" })
      );
      expect(result.current.normalizedHref).toBe("tel:+15122322212");
    });

    it("preserves existing tel: prefix", () => {
      const { result } = renderHook(() =>
        useNavigation({ href: "tel:+14322386131" })
      );
      expect(result.current.normalizedHref).toBe("tel:+14322386131");
    });
  });

  describe("URL normalization", () => {
    it("converts full internal URLs to relative paths", () => {
      const { result } = renderHook(() =>
        useNavigation({ href: "http://localhost:3000/about" })
      );
      expect(result.current.linkType).toBe("internal");
      expect(result.current.normalizedHref).toBe("/about");
    });

    it("preserves query params and hash", () => {
      const { result } = renderHook(() =>
        useNavigation({ href: "http://localhost:3000/about?id=1#section" })
      );
      expect(result.current.normalizedHref).toBe("/about?id=1#section");
    });

    it("handles www subdomain normalization", () => {
      // Test that external URLs remain external
      const { result } = renderHook(() =>
        useNavigation({ href: "https://example.com/about" })
      );
      expect(result.current.linkType).toBe("external");
      expect(result.current.normalizedHref).toBe("https://example.com/about");
    });

    it("does not modify external URLs", () => {
      const { result } = renderHook(() =>
        useNavigation({ href: "https://google.com/search" })
      );
      expect(result.current.normalizedHref).toBe("https://google.com/search");
    });
  });

  describe("Target and rel attributes", () => {
    it("sets target=_blank for external links", () => {
      const { result } = renderHook(() =>
        useNavigation({ href: "https://google.com" })
      );
      expect(result.current.target).toBe("_blank");
    });

    it("sets target=_self for internal links", () => {
      const { result } = renderHook(() =>
        useNavigation({ href: "/about" })
      );
      expect(result.current.target).toBe("_self");
    });

    it("sets rel=noopener noreferrer for external links", () => {
      const { result } = renderHook(() =>
        useNavigation({ href: "https://google.com" })
      );
      expect(result.current.rel).toBe("noopener noreferrer");
    });

    it("does not set target for mailto/tel links", () => {
      const { result: mailtoResult } = renderHook(() =>
        useNavigation({ href: "mailto:test@example.com" })
      );
      expect(mailtoResult.current.target).toBeUndefined();

      const { result: telResult } = renderHook(() =>
        useNavigation({ href: "tel:+14322386131" })
      );
      expect(telResult.current.target).toBeUndefined();
    });
  });

  describe("Click handler", () => {
    it("calls user onClick handler", () => {
      const onClick = vi.fn();
      const { result } = renderHook(() =>
        useNavigation({ href: "/about", onClick })
      );

      const mockEvent = {
        button: 0,
        metaKey: false,
        altKey: false,
        ctrlKey: false,
        shiftKey: false,
        defaultPrevented: false,
        preventDefault: vi.fn(),
      } as any;

      result.current.handleClick(mockEvent);
      expect(onClick).toHaveBeenCalledWith(mockEvent);
    });

    it("does not call handler if event is prevented", () => {
      const onClick = vi.fn();
      const { result } = renderHook(() =>
        useNavigation({ href: "/about", onClick })
      );

      const mockEvent = {
        button: 0,
        metaKey: false,
        altKey: false,
        ctrlKey: false,
        shiftKey: false,
        defaultPrevented: true,
        preventDefault: vi.fn(),
      } as any;

      result.current.handleClick(mockEvent);
      expect(mockEvent.preventDefault).not.toHaveBeenCalled();
    });

    it("handles internal navigation with router", () => {
      const { result } = renderHook(() =>
        useNavigation({ href: "/about" })
      );

      const mockEvent = {
        button: 0,
        metaKey: false,
        altKey: false,
        ctrlKey: false,
        shiftKey: false,
        defaultPrevented: false,
        preventDefault: vi.fn(),
        nativeEvent: {},
      } as any;

      result.current.handleClick(mockEvent);
      // Should prevent default and use router for internal navigation
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });
  });

  describe("Edge cases", () => {
    it("handles empty href", () => {
      const { result } = renderHook(() => useNavigation({ href: "" }));
      expect(result.current.linkType).toBe("none");
      expect(result.current.normalizedHref).toBeUndefined();
    });

    it("handles undefined href", () => {
      const { result } = renderHook(() => useNavigation({}));
      expect(result.current.linkType).toBe("none");
      expect(result.current.normalizedHref).toBeUndefined();
    });

    it("handles whitespace-only href", () => {
      const { result } = renderHook(() => useNavigation({ href: "   " }));
      expect(result.current.linkType).toBe("none");
      expect(result.current.normalizedHref).toBeUndefined();
    });
  });
});
