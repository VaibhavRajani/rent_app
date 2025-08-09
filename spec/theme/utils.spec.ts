import {
  getCSSVariable,
  getSemanticColorValue,
  generateComponentCSS,
  createThemeClass,
  getBackgroundColor,
  getTextColor,
  getBorderColor,
  isDarkMode,
} from "../../src/theme/utils";

describe("theme/utils", () => {
  describe("getCSSVariable", () => {
    it("should return fallback when window is undefined", () => {
      const result = getCSSVariable("--test-property", "fallback-value");
      expect(result).toBe("fallback-value");
    });

    it("should return empty string when no fallback provided", () => {
      const result = getCSSVariable("--test-property");
      expect(result).toBe("");
    });
  });

  describe("getSemanticColorValue", () => {
    it("should return light theme color when window is undefined", () => {
      const result = getSemanticColorValue("background");
      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
    });

    it("should return specified theme color", () => {
      const result = getSemanticColorValue("background", "dark");
      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
    });
  });

  describe("generateComponentCSS", () => {
    it("should generate CSS custom properties", () => {
      const tokens = {
        "primary-color": "#007bff",
        "secondary-color": "#6c757d",
      };

      const result = generateComponentCSS(tokens);

      expect(result).toContain("--primary-color: #007bff;");
      expect(result).toContain("--secondary-color: #6c757d;");
    });

    it("should handle empty tokens object", () => {
      const result = generateComponentCSS({});
      expect(result).toBe("");
    });
  });

  describe("createThemeClass", () => {
    it("should create theme-aware class names", () => {
      const themeVariants = {
        light: "light-variant",
        dark: "dark-variant",
      };

      const result = createThemeClass("base-class", themeVariants);

      expect(result).toContain("base-class");
      expect(result).toContain("base-class--light");
      expect(result).toContain("base-class--dark");
    });
  });

  describe("getBackgroundColor", () => {
    it("should return background color for primary variant", () => {
      const result = getBackgroundColor("primary");
      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
    });

    it("should return background color for secondary variant", () => {
      const result = getBackgroundColor("secondary");
      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
    });
  });

  describe("getTextColor", () => {
    it("should return text color for primary variant", () => {
      const result = getTextColor("primary");
      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
    });

    it("should return text color for secondary variant", () => {
      const result = getTextColor("secondary");
      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
    });
  });

  describe("getBorderColor", () => {
    it("should return border color for primary variant", () => {
      const result = getBorderColor("primary");
      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
    });

    it("should return border color for secondary variant", () => {
      const result = getBorderColor("secondary");
      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
    });
  });

  describe("isDarkMode", () => {
    it("should return false when window is undefined", () => {
      const result = isDarkMode();
      expect(result).toBe(false);
    });
  });
});
