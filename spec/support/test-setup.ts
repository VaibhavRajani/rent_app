// Test setup for TypeScript support
// Using CommonJS syntax for compatibility

// Mock window object for testing
if (typeof window === "undefined") {
  (global as any).window = {
    document: {
      documentElement: {
        getAttribute: () => "light",
        style: {
          getPropertyValue: () => "",
        },
      },
    },
  };
}

// Mock sessionStorage for testing
if (typeof sessionStorage === "undefined") {
  (global as any).sessionStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
  };
}

// Mock fetch for testing
if (typeof fetch === "undefined") {
  (global as any).fetch = () =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    });
}
