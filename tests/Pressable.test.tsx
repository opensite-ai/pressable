import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pressable } from "../src/core/Pressable";

describe("Pressable", () => {
  describe("Link rendering", () => {
    it("renders internal link with relative href", () => {
      render(<Pressable href="/about">About</Pressable>);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/about");
      expect(link).toHaveAttribute("target", "_self");
      expect(link).not.toHaveAttribute("rel");
    });

    it("renders external link with proper attributes", () => {
      render(<Pressable href="https://google.com">Google</Pressable>);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "https://google.com");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("normalizes phone numbers to tel: format", () => {
      render(<Pressable href="(432) 238-6131">Call</Pressable>);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "tel:+14322386131");
    });

    it("normalizes email addresses to mailto: format", () => {
      render(<Pressable href="test@example.com">Email</Pressable>);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "mailto:test@example.com");
    });

    it("applies button styles with asButton prop", () => {
      render(
        <Pressable href="/test" asButton variant="default">
          Button Link
        </Pressable>
      );
      const link = screen.getByRole("link");
      expect(link).toHaveClass("inline-flex");
    });
  });

  describe("Button rendering", () => {
    it("renders button when onClick provided without href", () => {
      const handleClick = vi.fn();
      render(<Pressable onClick={handleClick}>Click me</Pressable>);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("calls onClick handler when button is clicked", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Pressable onClick={handleClick}>Click me</Pressable>);
      const button = screen.getByRole("button");
      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("applies button variants and sizes", () => {
      render(
        <Pressable onClick={() => {}} variant="outline" size="lg">
          Button
        </Pressable>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("inline-flex");
    });
  });

  describe("Fallback rendering", () => {
    it("renders span when no href or onClick provided", () => {
      render(<Pressable>Plain text</Pressable>);
      const element = screen.getByText("Plain text");
      expect(element.tagName).toBe("SPAN");
    });

    it("renders custom fallback component type", () => {
      render(<Pressable fallbackComponentType="div">Text</Pressable>);
      const element = screen.getByText("Text");
      expect(element.tagName).toBe("DIV");
    });
  });

  describe("Accessibility", () => {
    it("forwards aria-label", () => {
      render(
        <Pressable href="/test" aria-label="Test link">
          Test
        </Pressable>
      );
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("aria-label", "Test link");
    });

    it("forwards aria-describedby", () => {
      render(
        <Pressable href="/test" aria-describedby="description">
          Test
        </Pressable>
      );
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("aria-describedby", "description");
    });

    it("forwards id attribute", () => {
      render(
        <Pressable href="/test" id="test-id">
          Test
        </Pressable>
      );
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("id", "test-id");
    });
  });

  describe("Custom props", () => {
    it("forwards data attributes", () => {
      render(
        <Pressable href="/test" data-testid="custom" data-foo="bar">
          Test
        </Pressable>
      );
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("data-testid", "custom");
      expect(link).toHaveAttribute("data-foo", "bar");
    });

    it("applies custom className", () => {
      render(
        <Pressable href="/test" className="custom-class">
          Test
        </Pressable>
      );
      const link = screen.getByRole("link");
      expect(link).toHaveClass("custom-class");
    });
  });

  describe("Refs", () => {
    it("forwards ref to link element", () => {
      const ref = { current: null };
      render(
        <Pressable href="/test" ref={ref as any}>
          Test
        </Pressable>
      );
      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });

    it("forwards ref to button element", () => {
      const ref = { current: null };
      render(
        <Pressable onClick={() => {}} ref={ref as any}>
          Test
        </Pressable>
      );
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });
});
