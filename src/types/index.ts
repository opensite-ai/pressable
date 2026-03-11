import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "../core/button-variants";

export type LinkType =
  | "internal"
  | "external"
  | "mailto"
  | "tel"
  | "unknown"
  | "none";

export interface UseNavigationArgs {
  href?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export interface UseNavigationReturn {
  linkType: LinkType;
  normalizedHref: string | undefined;
  target: "_blank" | "_self" | undefined;
  rel: string | undefined;
  isExternal: boolean;
  isInternal: boolean;
  shouldUseRouter: boolean;
  handleClick: React.MouseEventHandler<HTMLElement>;
}

type FallbackComponentType = "span" | "div" | "button";

interface PressableBaseProps {
  /**
   * Content inside the Pressable component
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * URL to navigate to (can be internal path, external URL, mailto:, tel:, or email/phone string)
   * Examples:
   * - "/about" - internal link
   * - "https://google.com" - external link
   * - "mailto:hello@example.com" or "hello@example.com" - email link
   * - "tel:+14322386131" or "(432) 238-6131" - phone link
   * - "https://mysite.com/blog" - will be converted to "/blog" if on mysite.com
   */
  href?: string;

  /**
   * Click handler
   */
  onClick?: React.MouseEventHandler<HTMLElement>;

  /**
   * The component type to render when there's no href or onClick
   * @default "span"
   */
  fallbackComponentType?: FallbackComponentType;

  /**
   * Explicit component type to render (overrides automatic selection)
   * Note: Internal links will ALWAYS render as <a> tags for SEO, even if componentType="button"
   */
  componentType?: "a" | "button" | FallbackComponentType;

  /**
   * Whether to render as a button styled link (uses ShadCN button styles)
   * When true, will apply button variant classes even when rendering an <a> tag
   * @default false
   */
  asButton?: boolean;

  /**
   * ARIA label for accessibility
   */
  "aria-label"?: string;

  /**
   * ARIA describedby for accessibility
   */
  "aria-describedby"?: string;

  /**
   * ID attribute
   */
  id?: string;

  /**
   * Data attributes
   */
  [key: `data-${string}`]: any;
}

// Combine Pressable props with button variants
export interface PressableProps
  extends PressableBaseProps,
    VariantProps<typeof buttonVariants> {}

// Type for link-specific props
export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

// Type for button-specific props
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
