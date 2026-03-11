"use client";

import * as React from "react";
import { cn } from "../utils/cn";
import { useNavigation } from "../hooks/useNavigation";
import { buttonVariants } from "./button-variants";
import type { PressableProps, LinkProps, ButtonProps } from "../types";

/**
 * Universal link/button component with automatic URL detection and normalization.
 *
 * Features:
 * - Automatic link type detection (internal, external, mailto, tel)
 * - Phone number normalization (various formats to tel:)
 * - Email normalization to mailto:
 * - Internal URL normalization (full URLs to relative paths)
 * - Proper SEO attributes (always uses <a> for links, even when styled as buttons)
 * - ShadCN button variants and sizes
 * - Flexible layout support (icon+label or custom children)
 * - React Router-style internal navigation
 *
 * @example
 * Simple link
 * ```tsx
 * <Pressable href="/about">About Us</Pressable>
 * ```
 *
 * @example
 * Button-styled link with icon
 * ```tsx
 * <Pressable href="/quotes" variant="default" size="lg" asButton>
 *   <DynamicIcon name="lucide/calculator" size={20} />
 *   Get a Free Quote
 * </Pressable>
 * ```
 *
 * @example
 * External link (automatically gets target="_blank" and rel="noopener noreferrer")
 * ```tsx
 * <Pressable href="https://google.com">Visit Google</Pressable>
 * ```
 *
 * @example
 * Phone link (automatically normalized to tel: format)
 * ```tsx
 * <Pressable href="(432) 238-6131">Call Us</Pressable>
 * // Renders: <a href="tel:+14322386131">
 * ```
 *
 * @example
 * Custom layout with full children control
 * ```tsx
 * <Pressable href="/services" className="custom-card">
 *   <div className="card-header">
 *     <DynamicIcon name="service-icon" />
 *     <h3>Our Services</h3>
 *   </div>
 *   <p>Learn more about what we offer</p>
 * </Pressable>
 * ```
 *
 * @example
 * Button with onClick (no href)
 * ```tsx
 * <Pressable onClick={() => alert("Clicked")} variant="default" size="md" asButton>
 *   Click Me
 * </Pressable>
 * ```
 */
export const Pressable = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement,
  PressableProps & Partial<LinkProps> & Partial<ButtonProps>
>(
  (
    {
      children,
      className,
      href,
      onClick,
      variant,
      size,
      asButton = false,
      fallbackComponentType = "span",
      componentType,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedby,
      id,
      ...props
    },
    ref
  ) => {
    const navigation = useNavigation({ href, onClick });
    const {
      normalizedHref,
      target,
      rel,
      linkType,
      isInternal,
      handleClick,
    } = navigation;

    // Determine what component to render
    const shouldRenderLink = normalizedHref && linkType !== "none";
    const shouldRenderButton = !shouldRenderLink && onClick;

    // Force <a> tag for internal links for SEO (even if componentType="button")
    const effectiveComponentType =
      componentType ||
      (shouldRenderLink
        ? "a"
        : shouldRenderButton
          ? "button"
          : fallbackComponentType);

    // Override for SEO: internal links must be <a> tags
    const finalComponentType =
      isInternal && shouldRenderLink ? "a" : effectiveComponentType;

    // Determine if we should apply button styles
    const shouldApplyButtonStyles = asButton || variant || size;

    // Build className
    const combinedClassName = cn(
      shouldApplyButtonStyles && buttonVariants({ variant, size }),
      className
    );

    const dataProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => key.startsWith("data-"))
    );
    const buttonDataAttributes = shouldApplyButtonStyles
      ? {
          "data-slot": "button",
          "data-variant": variant ?? "default",
          "data-size": size ?? "default",
        }
      : {};

    // Build common props
    const commonProps = {
      className: combinedClassName,
      onClick: handleClick,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedby,
      id,
      ...dataProps,
      ...buttonDataAttributes,
    };

    // Render link
    if (finalComponentType === "a" && shouldRenderLink) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={normalizedHref}
          target={target}
          rel={rel}
          {...commonProps}
          {...(props as LinkProps)}
        >
          {children}
        </a>
      );
    }

    // Render button
    if (finalComponentType === "button") {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type={(props as ButtonProps).type || "button"}
          {...commonProps}
          {...(props as ButtonProps)}
        >
          {children}
        </button>
      );
    }

    // Render fallback (span or div)
    if (finalComponentType === "div") {
      return (
        <div ref={ref as React.Ref<HTMLDivElement>} {...commonProps}>
          {children}
        </div>
      );
    }

    // Default to span
    return (
      <span ref={ref as React.Ref<HTMLSpanElement>} {...commonProps}>
        {children}
      </span>
    );
  }
);

Pressable.displayName = "Pressable";
