import {
  formatPassword,
  validatePassword,
  getPasswordHint,
  isAuthenticated,
  setAuthenticated,
  clearAuthentication,
} from "../../src/utils/passwordUtils";

describe("passwordUtils", () => {
  describe("formatPassword", () => {
    it("should remove non-digit characters", () => {
      expect(formatPassword("12/34")).toBe("1234");
      expect(formatPassword("12-34")).toBe("1234");
      expect(formatPassword("12 34")).toBe("1234");
    });

    it("should limit to 4 digits", () => {
      expect(formatPassword("123456")).toBe("1234");
      expect(formatPassword("123")).toBe("123");
    });

    it("should handle empty string", () => {
      expect(formatPassword("")).toBe("");
    });

    it("should handle string with no digits", () => {
      expect(formatPassword("abc")).toBe("");
    });
  });

  describe("validatePassword (legacy)", () => {
    it("should return true for matching birthday", () => {
      const mockRoommate = { birthday: "29/11" };
      expect(validatePassword(mockRoommate, "29/11")).toBe(true);
    });

    it("should return false for non-matching birthday", () => {
      const mockRoommate = { birthday: "29/11" };
      expect(validatePassword(mockRoommate, "30/11")).toBe(false);
    });
  });

  describe("getPasswordHint", () => {
    it("should return birthday hint when birthday exists", () => {
      const mockRoommate = { birthday: "29/11" };
      expect(getPasswordHint(mockRoommate)).toBe("Your birthday: 29/11");
    });

    it("should return default hint when birthday does not exist", () => {
      const mockRoommate = {};
      expect(getPasswordHint(mockRoommate)).toBe("DD/MM format");
    });
  });

  describe("authentication storage", () => {
    beforeEach(() => {
      // Clear sessionStorage before each test
      sessionStorage.clear();
    });

    it("should set and get authentication status", () => {
      const roommateId = "test-roommate-1";

      expect(isAuthenticated(roommateId)).toBe(false);

      setAuthenticated(roommateId);
      expect(isAuthenticated(roommateId)).toBe(true);
    });

    it("should clear authentication status", () => {
      const roommateId = "test-roommate-2";

      setAuthenticated(roommateId);
      expect(isAuthenticated(roommateId)).toBe(true);

      clearAuthentication(roommateId);
      expect(isAuthenticated(roommateId)).toBe(false);
    });

    it("should handle multiple roommates independently", () => {
      const roommate1 = "roommate-1";
      const roommate2 = "roommate-2";

      setAuthenticated(roommate1);
      expect(isAuthenticated(roommate1)).toBe(true);
      expect(isAuthenticated(roommate2)).toBe(false);

      setAuthenticated(roommate2);
      expect(isAuthenticated(roommate1)).toBe(true);
      expect(isAuthenticated(roommate2)).toBe(true);
    });
  });
});
