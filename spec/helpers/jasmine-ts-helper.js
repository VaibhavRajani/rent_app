// JavaScript helper for Jasmine testing

// Mock window object for testing
if (typeof window === "undefined") {
  global.window = {
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

  // Mock getComputedStyle
  global.getComputedStyle = function (element) {
    return {
      getPropertyValue: function (property) {
        return "";
      },
    };
  };

  // Mock document
  global.document = {
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
  };
}

// Mock sessionStorage for testing
if (typeof sessionStorage === "undefined") {
  const storage = {};
  global.sessionStorage = {
    getItem: function (key) {
      return storage[key] || null;
    },
    setItem: function (key, value) {
      storage[key] = value;
    },
    removeItem: function (key) {
      delete storage[key];
    },
    clear: function () {
      Object.keys(storage).forEach((key) => delete storage[key]);
    },
  };
}

// Mock fetch for testing
if (typeof fetch === "undefined") {
  global.fetch = function () {
    return Promise.resolve({
      ok: true,
      json: function () {
        return Promise.resolve({});
      },
    });
  };
}
