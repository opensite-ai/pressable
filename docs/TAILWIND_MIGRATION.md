# Pressable Component - Tailwind Configuration Migration Guide

## Overview
The `Pressable` component has been extracted from `@opensite/ui` into its own NPM package `@page-speed/pressable` to resolve cross-import issues. This migration guide ensures Tailwind styles continue to work properly.

## Required Configuration Changes

### 1. Update Tailwind Content Paths

All applications using `@opensite/ui` or `@page-speed/pressable` must update their Tailwind configuration to scan the Pressable package for utility classes.

#### For Standard npm/yarn Installations

```js
// tailwind.config.js or tailwind.config.mjs
module.exports = {
  content: [
    // Your existing paths...
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@opensite/ui/dist/**/*.{js,mjs}",

    // ADD THIS LINE:
    "./node_modules/@page-speed/pressable/dist/**/*.{js,cjs}",
  ],
  // ... rest of config
}
```

#### For pnpm Monorepos

```js
// tailwind.config.js or tailwind.config.mjs
module.exports = {
  content: [
    // Your existing paths...
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@opensite/ui/dist/**/*.{js,mjs}",

    // ADD BOTH LINES:
    "./node_modules/@page-speed/pressable/dist/**/*.{js,cjs}",
    "./node_modules/.pnpm/@page-speed+pressable*/node_modules/@page-speed/pressable/**/*.{js,jsx,ts,tsx}",
  ],
  // ... rest of config
}
```

### 2. Ensure CSS Variables Are Defined

The Pressable component requires specific CSS variables for button styling. These should be present in your global CSS file:

```css
:root {
  /* Required color variables */
  --primary: /* your primary color */;
  --primary-foreground: /* text on primary */;
  --secondary: /* your secondary color */;
  --secondary-foreground: /* text on secondary */;
  --destructive: /* your error/danger color */;
  --destructive-foreground: /* text on destructive */;
  --accent: /* your accent color */;
  --accent-foreground: /* text on accent */;
  --background: /* your background color */;
  --foreground: /* your text color */;
  --border: /* your border color */;
  --input: /* your input border color */;
  --ring: /* your focus ring color */;

  /* Required radius variable */
  --radius: /* your border radius, e.g., 0.5rem */;
}
```

For a complete list of button-specific CSS variables and customization options, see the `@opensite/ui` [STYLES.md documentation](https://github.com/opensite-ai/opensite-ui/blob/main/docs/STYLES.md).

### 3. Restart Development Servers

After making these changes, restart your development servers to ensure Tailwind recompiles with the new content paths:

```bash
# Stop your current dev server (Ctrl+C)
# Then restart:
npm run dev
# or
pnpm dev
# or
yarn dev
```

## Affected Applications

The following applications in the DashTrack ecosystem need these updates:

- **dt-cms/Source** - ✅ Updated
- **opensite-ui-showcase** - ✅ Updated
- Any other application using `@opensite/ui` or `@page-speed/pressable`

## Import Path Changes

The import paths remain the same for applications using `@opensite/ui`:

```tsx
// Still works - re-exported from @opensite/ui
import { Pressable } from "@opensite/ui/lib/pressable";
import { buttonVariants } from "@opensite/ui/lib/button-variants";
```

For direct usage of `@page-speed/pressable`:

```tsx
// Direct import from the package
import { Pressable } from "@page-speed/pressable";
import { buttonVariants } from "@page-speed/pressable/core";
```

## Troubleshooting

### Styles Not Applying

**Problem**: Button/link styles are missing after the migration

**Solutions**:
1. Verify Tailwind content paths include `@page-speed/pressable`
2. Clear your build cache and rebuild
3. Ensure CSS variables are defined in your global styles
4. Check that you're using the correct import paths

### Build Errors

**Problem**: Build fails with missing module errors

**Solutions**:
1. Update to the latest version of `@opensite/ui` (3.1.5+)
2. Ensure `@page-speed/pressable` is installed (0.0.6+)
3. Clear node_modules and reinstall dependencies

### Dark Mode Issues

**Problem**: Dark mode styles not working correctly

**Solution**: Ensure your dark mode CSS variables are properly defined and the `.dark` class is applied to your root element.

## Version Requirements

- `@opensite/ui`: 3.1.5 or higher
- `@page-speed/pressable`: 0.0.6 or higher
- `tailwindcss`: 3.4+ or 4.0+

## Support

For issues or questions:
- GitHub Issues: https://github.com/opensite-ai/pressable/issues
- Documentation: See README.md for component API reference