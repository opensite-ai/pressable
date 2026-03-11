# @page-speed/pressable

## Performance-optimized universal link/button component with automatic URL detection and normalization for the [OpenSite Semantic Site Builder](https://opensite.ai) ecosystem. Provides tree-shakable, performance-optimized components with abstract styling support

![Page Speed Pressable Component](https://octane.cdn.ing/api/v1/images/transform?url=https://cdn.ing/assets/i/r/293695/lsctquoi97zr5zg1vitd0zia1hmu/banner.png&f=webp)

<br />

[![npm version](https://img.shields.io/npm/v/@page-speed/pressable?style=for-the-badge)](https://www.npmjs.com/package/@page-speed/pressable)
[![npm downloads](https://img.shields.io/npm/dm/@page-speed/pressable?style=for-the-badge)](https://www.npmjs.com/package/@page-speed/pressable)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge)](./tsconfig.json)

## Features

- 🔗 **Universal Component**: Automatically renders `<a>`, `<button>`, or fallback elements based on props
- 🌐 **Smart URL Detection**: Automatically detects and normalizes internal, external, mailto, and tel links
- 📱 **Phone Number Normalization**: Converts various phone formats to standard `tel:` format
- ✉️ **Email Normalization**: Automatically adds `mailto:` prefix to email addresses
- 🎨 **ShadCN Button Variants**: Full integration with ShadCN button styles and variants
- ♿ **Accessibility First**: Proper ARIA attributes, keyboard navigation, and screen reader support
- 🎯 **SEO Optimized**: Internal links always render as `<a>` tags for proper SEO
- 🌲 **Tree-Shakable**: Granular exports for minimal bundle size
- 🚀 **Zero Runtime Overhead**: Efficient memoization and minimal re-renders
- 🔒 **Type Safe**: Full TypeScript support with comprehensive types

## Installation

\`\`\`bash
# Using pnpm (recommended)
pnpm add @page-speed/pressable

# Using npm
npm install @page-speed/pressable

# Using yarn
yarn add @page-speed/pressable
\`\`\`

## Peer Dependencies

\`\`\`json
{
  "react": ">=17.0.0",
  "react-dom": ">=17.0.0"
}
\`\`\`

## Basic Usage

### Simple Link

\`\`\`tsx
import { Pressable } from "@page-speed/pressable";

function Navigation() {
  return <Pressable href="/about">About Us</Pressable>;
}
\`\`\`

### External Link

Automatically gets \`target="_blank"\` and \`rel="noopener noreferrer"\`:

\`\`\`tsx
<Pressable href="https://google.com">Visit Google</Pressable>
\`\`\`

### Button-Styled Link

\`\`\`tsx
<Pressable href="/contact" asButton variant="default" size="lg">
  Contact Us
</Pressable>
\`\`\`

### Phone Link

Automatically normalized to \`tel:\` format:

\`\`\`tsx
<Pressable href="(432) 238-6131">Call Us</Pressable>
// Renders: <a href="tel:+14322386131">Call Us</a>
\`\`\`

### Email Link

Automatically normalized to \`mailto:\` format:

\`\`\`tsx
<Pressable href="info@example.com">Email Us</Pressable>
// Renders: <a href="mailto:info@example.com">Email Us</a>
\`\`\`

### Button with onClick

\`\`\`tsx
<Pressable onClick={() => alert("Clicked")} asButton variant="default">
  Click Me
</Pressable>
\`\`\`

## Advanced Usage

### Button Variants

Supports all ShadCN button variants:

\`\`\`tsx
// Default variant
<Pressable href="/primary" variant="default">Primary</Pressable>

// Outline variant
<Pressable href="/outline" variant="outline">Outline</Pressable>

// Secondary variant
<Pressable href="/secondary" variant="secondary">Secondary</Pressable>

// Ghost variant
<Pressable href="/ghost" variant="ghost">Ghost</Pressable>

// Link variant
<Pressable href="/link" variant="link">Link Style</Pressable>

// Destructive variant
<Pressable href="/delete" variant="destructive">Delete</Pressable>
\`\`\`

### Button Sizes

\`\`\`tsx
<Pressable href="/small" size="sm">Small</Pressable>
<Pressable href="/default" size="default">Default</Pressable>
<Pressable href="/medium" size="md">Medium</Pressable>
<Pressable href="/large" size="lg">Large</Pressable>

// Icon sizes
<Pressable href="/icon" size="icon">
  <Icon />
</Pressable>
<Pressable href="/icon-sm" size="icon-sm">
  <Icon />
</Pressable>
<Pressable href="/icon-lg" size="icon-lg">
  <Icon />
</Pressable>
\`\`\`

### Custom Layouts

Full control over children:

\`\`\`tsx
<Pressable href="/services" className="flex flex-col gap-4 p-6 rounded-lg border">
  <div className="flex items-center gap-2">
    <ServiceIcon />
    <h3>Our Services</h3>
  </div>
  <p>Learn more about what we offer</p>
</Pressable>
\`\`\`

### Accessibility

\`\`\`tsx
<Pressable
  href="/important"
  aria-label="Important action"
  aria-describedby="description"
  id="important-link"
>
  <span id="description">Click here for important information</span>
</Pressable>
\`\`\`

### Refs

\`\`\`tsx
const linkRef = useRef<HTMLAnchorElement>(null);

<Pressable ref={linkRef} href="/ref-example">
  Link with Ref
</Pressable>
\`\`\`

## API Reference

### Props

#### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`children\` | \`ReactNode\` | - | Content inside the component |
| \`href\` | \`string\` | - | URL to navigate to (supports internal, external, mailto, tel) |
| \`onClick\` | \`MouseEventHandler\` | - | Click handler function |
| \`className\` | \`string\` | - | Additional CSS classes |
| \`asButton\` | \`boolean\` | \`false\` | Apply button styles even when rendering as \`<a>\` |

#### Button Styling

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`variant\` | \`'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link'\` | - | Button variant style |
| \`size\` | \`'default' \| 'sm' \| 'md' \| 'lg' \| 'icon' \| 'icon-sm' \| 'icon-lg'\` | - | Button size |

#### Component Type

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`componentType\` | \`'a' \| 'button' \| 'span' \| 'div'\` | auto | Explicit component type to render |
| \`fallbackComponentType\` | \`'span' \| 'div' \| 'button'\` | \`'span'\` | Component to render when no href/onClick |

#### Accessibility

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`aria-label\` | \`string\` | - | ARIA label for accessibility |
| \`aria-describedby\` | \`string\` | - | ARIA describedby reference |
| \`id\` | \`string\` | - | Element ID |

#### Data Attributes

Any \`data-*\` attributes are automatically forwarded to the rendered element.

## URL Detection & Normalization

### Internal Links

Full URLs matching the current origin are automatically converted to relative paths:

\`\`\`tsx
// On https://example.com
<Pressable href="https://example.com/about">About</Pressable>
// Renders: <a href="/about">About</a>
\`\`\`

### Phone Number Formats

Supports various phone number formats:

\`\`\`tsx
<Pressable href="(432) 238-6131" />      // → tel:+14322386131
<Pressable href="512-232-2212" />        // → tel:+5122322212
<Pressable href="512.232.2212" />        // → tel:+5122322212
<Pressable href="+1 432 238 6131" />     // → tel:+14322386131
<Pressable href="512-232-2212x123" />    // → tel:+5122322212;ext=123
\`\`\`

### Email Detection

Automatically detects email addresses:

\`\`\`tsx
<Pressable href="hello@example.com" />   // → mailto:hello@example.com
<Pressable href="mailto:test@ex.com" />  // → mailto:test@ex.com (unchanged)
\`\`\`

## Hooks

### useNavigation

Low-level hook for custom navigation logic:

\`\`\`tsx
import { useNavigation } from "@page-speed/pressable/hooks";

function CustomLink({ href }) {
  const {
    linkType,
    normalizedHref,
    target,
    rel,
    isInternal,
    isExternal,
    handleClick,
  } = useNavigation({ href });

  return (
    <a href={normalizedHref} target={target} rel={rel} onClick={handleClick}>
      {href}
    </a>
  );
}
\`\`\`

#### useNavigation Return Values

| Property | Type | Description |
|----------|------|-------------|
| \`linkType\` | \`'internal' \| 'external' \| 'mailto' \| 'tel' \| 'none' \| 'unknown'\` | Detected link type |
| \`normalizedHref\` | \`string \| undefined\` | Normalized URL |
| \`target\` | \`'_blank' \| '_self' \| undefined\` | Link target attribute |
| \`rel\` | \`string \| undefined\` | Link rel attribute |
| \`isInternal\` | \`boolean\` | Whether link is internal |
| \`isExternal\` | \`boolean\` | Whether link is external |
| \`shouldUseRouter\` | \`boolean\` | Whether to use client-side routing |
| \`handleClick\` | \`MouseEventHandler\` | Click handler function |

## Utilities

### cn

Utility for merging Tailwind classes:

\`\`\`tsx
import { cn } from "@page-speed/pressable/utils";

function CustomButton() {
  return (
    <Pressable
      href="/test"
      className={cn(
        "base-class",
        isActive && "active-class",
        { "conditional": someCondition }
      )}
    >
      Custom Button
    </Pressable>
  );
}
\`\`\`

## Integration with opensite-blocks

The Pressable component integrates seamlessly with the opensite-blocks navigation system:

\`\`\`tsx
// Set up navigation handler (typically done in opensite-blocks)
window.__opensiteNavigationHandler = (href, event) => {
  // Custom navigation logic (e.g., React Router)
  navigate(href);
  return true; // Indicates navigation was handled
};

// Pressable automatically uses the handler for internal links
<Pressable href="/about">About</Pressable>
\`\`\`

## CSS Variables

The component supports extensive CSS variable customization for button styles. See the [button-variants.ts](./src/core/button-variants.ts) file for the complete list of CSS variables.

### Master Variables

\`\`\`css
:root {
  --button-font-family: inherit;
  --button-font-weight: 500;
  --button-letter-spacing: 0;
  --button-line-height: 1.25;
  --button-text-transform: none;
  --button-transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --button-radius: 0.375rem;
  --button-shadow: none;
  --button-shadow-hover: none;
}
\`\`\`

### Per-Variant Variables

\`\`\`css
:root {
  /* Default variant */
  --button-default-bg: hsl(var(--primary));
  --button-default-fg: hsl(var(--primary-foreground));
  --button-default-hover-bg: hsl(var(--primary) / 0.9);

  /* Outline variant */
  --button-outline-bg: hsl(var(--background));
  --button-outline-border: hsl(var(--border));
  --button-outline-border-width: 1px;

  /* ... and more */
}
\`\`\`

## Tree-Shaking

The package is fully tree-shakable. Import only what you need:

\`\`\`tsx
// Import specific components
import { Pressable } from "@page-speed/pressable/core";
import { useNavigation } from "@page-speed/pressable/hooks";
import { cn } from "@page-speed/pressable/utils";

// Or use granular imports
import { Pressable } from "@page-speed/pressable/core/Pressable";
import { buttonVariants } from "@page-speed/pressable/core/button-variants";
\`\`\`

## Performance

- **Bundle Size**: ~8KB gzipped (including all dependencies)
- **Tree-Shaking**: Unused code is automatically eliminated
- **Memoization**: All computed values are memoized with React.useMemo
- **Zero Runtime Overhead**: Efficient URL detection and normalization
- **SSR Compatible**: Works seamlessly with server-side rendering

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- React 17+
- Server-side rendering (SSR)
- Static site generation (SSG)

## License

MIT

## Contributing

Contributions are welcome! Please follow the [DashTrack ecosystem guidelines](./docs/ECOSYSTEM_GUIDELINES.md).

## Related Packages

- [@page-speed/img](https://www.npmjs.com/package/@page-speed/img) - Performance-optimized image component
- [@page-speed/markdown-to-jsx](https://www.npmjs.com/package/@page-speed/markdown-to-jsx) - Markdown renderer with Pressable integration
- [@opensite/blocks](https://www.npmjs.com/package/@opensite/blocks) - Chai design payload renderer

## Support

- [GitHub Issues](https://github.com/opensite-ai/pressable/issues)
- [DashTrack Documentation](https://docs.dashtrack.com)
