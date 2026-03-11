import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

// Extend Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// Mock @page-speed/router
vi.mock("@page-speed/router", () => ({
  useNavigation: () => ({
    navigateTo: vi.fn(),
    replace: vi.fn(),
    reload: vi.fn(),
  }),
  useUrl: () => ({
    href: "http://localhost:3000/",
    origin: "http://localhost:3000",
    protocol: "http:",
    host: "localhost:3000",
    hostname: "localhost",
    port: "3000",
    pathname: "/",
    search: "",
    hash: "",
  }),
  isBrowser: () => true,
}));

// Mock window.scrollTo to avoid jsdom errors
global.window.scrollTo = vi.fn();

// Cleanup after each test case (e.g., clearing jsdom)
afterEach(() => {
  cleanup();
});
