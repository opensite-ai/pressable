import { cva } from "class-variance-authority";

/**
 * Button variants using class-variance-authority (cva).
 *
 * This is extracted to a separate file to avoid importing @radix-ui/react-slot
 * when only the variants are needed (e.g., in Pressable component).
 *
 * ## CSS Variable Reference
 *
 * ### Master Button Variables (apply to all variants)
 * - `--button-font-family` - Font family (default: inherit)
 * - `--button-font-weight` - Font weight (default: 500)
 * - `--button-letter-spacing` - Letter spacing (default: 0)
 * - `--button-line-height` - Line height (default: 1.25)
 * - `--button-text-transform` - Text transform (default: none)
 * - `--button-transition` - Transition timing (default: all 250ms cubic-bezier(0.4, 0, 0.2, 1))
 * - `--button-radius` - Border radius (default: var(--radius, 0.375rem))
 * - `--button-shadow` - Default box shadow (default: none)
 * - `--button-shadow-hover` - Hover box shadow (default: none)
 *
 * ### Size Variables
 * - `--button-height-sm/md/lg` - Button heights
 * - `--button-padding-x-sm/md/lg` - Horizontal padding
 * - `--button-padding-y-sm/md/lg` - Vertical padding
 *
 * ### Per-Variant Variables (replace {variant} with: default, destructive, outline, secondary, ghost, link)
 * - `--button-{variant}-bg` - Background color
 * - `--button-{variant}-fg` - Text/foreground color
 * - `--button-{variant}-border` - Border color
 * - `--button-{variant}-border-width` - Border width
 * - `--button-{variant}-hover-bg` - Hover background color
 * - `--button-{variant}-hover-fg` - Hover text color
 * - `--button-{variant}-hover-border` - Hover border color
 * - `--button-{variant}-shadow` - Box shadow (overrides master)
 * - `--button-{variant}-shadow-hover` - Hover box shadow (overrides master)
 */

// Base styles applied to all buttons - includes master typography, transition, and layout
const baseStyles = [
  // Layout
  "inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0",
  // Typography - using CSS variables with sensible defaults
  "font-[var(--button-font-family,inherit)]",
  "font-[var(--button-font-weight,500)]",
  "tracking-[var(--button-letter-spacing,0)]",
  "leading-[var(--button-line-height,1.25)]",
  "[text-transform:var(--button-text-transform,none)]",
  "text-sm",
  // Border radius
  "rounded-[var(--button-radius,var(--radius,0.375rem))]",
  // Smooth transition - using [transition:...] to set full shorthand property (not just transition-property)
  "[transition:var(--button-transition,all_250ms_cubic-bezier(0.4,0,0.2,1))]",
  // Box shadow (master level) - using [box-shadow:...] for complex multi-value shadows
  "[box-shadow:var(--button-shadow,none)]",
  "hover:[box-shadow:var(--button-shadow-hover,var(--button-shadow,none))]",
  // Disabled state
  "disabled:pointer-events-none disabled:opacity-50",
  // SVG handling
  "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
  // Focus styles
  "outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  // Invalid state
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
].join(" ");

export const buttonVariants = cva(baseStyles, {
  variants: {
    variant: {
      // Default (Primary) variant - full customization
      default: [
        "bg-[var(--button-default-bg,hsl(var(--primary)))]",
        "text-[var(--button-default-fg,hsl(var(--primary-foreground)))]",
        "border-[length:var(--button-default-border-width,0px)]",
        "border-[color:var(--button-default-border,transparent)]",
        "[box-shadow:var(--button-default-shadow,var(--button-shadow,none))]",
        "hover:bg-[var(--button-default-hover-bg,hsl(var(--primary)/0.9))]",
        "hover:text-[var(--button-default-hover-fg,var(--button-default-fg,hsl(var(--primary-foreground))))]",
        "hover:border-[color:var(--button-default-hover-border,var(--button-default-border,transparent))]",
        "hover:[box-shadow:var(--button-default-shadow-hover,var(--button-shadow-hover,var(--button-default-shadow,var(--button-shadow,none))))]",
      ].join(" "),

      // Destructive variant - full customization
      destructive: [
        "bg-[var(--button-destructive-bg,hsl(var(--destructive)))]",
        "text-[var(--button-destructive-fg,white)]",
        "border-[length:var(--button-destructive-border-width,0px)]",
        "border-[color:var(--button-destructive-border,transparent)]",
        "[box-shadow:var(--button-destructive-shadow,var(--button-shadow,none))]",
        "hover:bg-[var(--button-destructive-hover-bg,hsl(var(--destructive)/0.9))]",
        "hover:text-[var(--button-destructive-hover-fg,var(--button-destructive-fg,white))]",
        "hover:border-[color:var(--button-destructive-hover-border,var(--button-destructive-border,transparent))]",
        "hover:[box-shadow:var(--button-destructive-shadow-hover,var(--button-shadow-hover,var(--button-destructive-shadow,var(--button-shadow,none))))]",
        "focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        "dark:bg-destructive/60",
      ].join(" "),

      // Outline variant - full customization with proper border handling
      outline: [
        "bg-[var(--button-outline-bg,hsl(var(--background)))]",
        "text-[var(--button-outline-fg,inherit)]",
        "border-[length:var(--button-outline-border-width,1px)]",
        "border-[color:var(--button-outline-border,hsl(var(--border)))]",
        "[box-shadow:var(--button-outline-shadow,var(--button-shadow,0_1px_2px_0_rgb(0_0_0/0.05)))]",
        "hover:bg-[var(--button-outline-hover-bg,hsl(var(--accent)))]",
        "hover:text-[var(--button-outline-hover-fg,hsl(var(--accent-foreground)))]",
        "hover:border-[color:var(--button-outline-hover-border,var(--button-outline-border,hsl(var(--border))))]",
        "hover:[box-shadow:var(--button-outline-shadow-hover,var(--button-shadow-hover,var(--button-outline-shadow,var(--button-shadow,none))))]",
        "dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
      ].join(" "),

      // Secondary variant - full customization
      secondary: [
        "bg-[var(--button-secondary-bg,hsl(var(--secondary)))]",
        "text-[var(--button-secondary-fg,hsl(var(--secondary-foreground)))]",
        "border-[length:var(--button-secondary-border-width,0px)]",
        "border-[color:var(--button-secondary-border,transparent)]",
        "[box-shadow:var(--button-secondary-shadow,var(--button-shadow,none))]",
        "hover:bg-[var(--button-secondary-hover-bg,hsl(var(--secondary)/0.8))]",
        "hover:text-[var(--button-secondary-hover-fg,var(--button-secondary-fg,hsl(var(--secondary-foreground))))]",
        "hover:border-[color:var(--button-secondary-hover-border,var(--button-secondary-border,transparent))]",
        "hover:[box-shadow:var(--button-secondary-shadow-hover,var(--button-shadow-hover,var(--button-secondary-shadow,var(--button-shadow,none))))]",
      ].join(" "),

      // Ghost variant - full customization
      ghost: [
        "bg-[var(--button-ghost-bg,transparent)]",
        "text-[var(--button-ghost-fg,inherit)]",
        "border-[length:var(--button-ghost-border-width,0px)]",
        "border-[color:var(--button-ghost-border,transparent)]",
        "[box-shadow:var(--button-ghost-shadow,var(--button-shadow,none))]",
        "hover:bg-[var(--button-ghost-hover-bg,hsl(var(--accent)))]",
        "hover:text-[var(--button-ghost-hover-fg,hsl(var(--accent-foreground)))]",
        "hover:border-[color:var(--button-ghost-hover-border,var(--button-ghost-border,transparent))]",
        "hover:[box-shadow:var(--button-ghost-shadow-hover,var(--button-shadow-hover,var(--button-ghost-shadow,var(--button-shadow,none))))]",
        "dark:hover:bg-accent/50",
      ].join(" "),

      // Link variant - full customization
      link: [
        "bg-[var(--button-link-bg,transparent)]",
        "text-[var(--button-link-fg,hsl(var(--primary)))]",
        "border-[length:var(--button-link-border-width,0px)]",
        "border-[color:var(--button-link-border,transparent)]",
        "[box-shadow:var(--button-link-shadow,none)]",
        "hover:bg-[var(--button-link-hover-bg,transparent)]",
        "hover:text-[var(--button-link-hover-fg,var(--button-link-fg,hsl(var(--primary))))]",
        "hover:[box-shadow:var(--button-link-shadow-hover,none)]",
        "underline-offset-4 hover:underline",
      ].join(" "),
    },
    size: {
      default: [
        "h-[var(--button-height-md,2.25rem)]",
        "px-[var(--button-padding-x-md,1rem)]",
        "py-[var(--button-padding-y-md,0.5rem)]",
        "has-[>svg]:px-[calc(var(--button-padding-x-md,1rem)*0.75)]",
      ].join(" "),
      sm: [
        "h-[var(--button-height-sm,2rem)]",
        "px-[var(--button-padding-x-sm,0.75rem)]",
        "py-[var(--button-padding-y-sm,0.25rem)]",
        "gap-1.5",
        "has-[>svg]:px-[calc(var(--button-padding-x-sm,0.75rem)*0.83)]",
      ].join(" "),
      md: [
        "h-[var(--button-height-md,2.25rem)]",
        "px-[var(--button-padding-x-md,1rem)]",
        "py-[var(--button-padding-y-md,0.5rem)]",
        "has-[>svg]:px-[calc(var(--button-padding-x-md,1rem)*0.75)]",
      ].join(" "),
      lg: [
        "h-[var(--button-height-lg,2.5rem)]",
        "px-[var(--button-padding-x-lg,1.5rem)]",
        "py-[var(--button-padding-y-lg,0.5rem)]",
        "has-[>svg]:px-[calc(var(--button-padding-x-lg,1.5rem)*0.67)]",
      ].join(" "),
      icon: "size-[var(--button-height-md,2.25rem)]",
      "icon-sm": "size-[var(--button-height-sm,2rem)]",
      "icon-lg": "size-[var(--button-height-lg,2.5rem)]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
