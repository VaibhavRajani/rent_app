// TypeScript helper for Jasmine testing
// Using JavaScript syntax for compatibility

// Mock window object for testing
if (typeof window === "undefined") {
  (global as any).window = {
    document: {
      documentElement: {
        getAttribute: function () {
          return "light";
        },
        style: {
          getPropertyValue: function () {
            return "";
          },
        },
      },
    },
  };
}

// Mock sessionStorage for testing
if (typeof sessionStorage === "undefined") {
  (global as any).sessionStorage = {
    getItem: function () {
      return null;
    },
    setItem: function () {},
    removeItem: function () {},
    clear: function () {},
  };
}

// Mock fetch for testing
if (typeof fetch === "undefined") {
  (global as any).fetch = function () {
    return Promise.resolve({
      ok: true,
      json: function () {
        return Promise.resolve({});
      },
    } as any);
  };
}
