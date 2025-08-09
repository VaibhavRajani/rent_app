import {
  generateVenmoLink,
  generateVenmoWebLink,
} from "../../src/utils/venmoUtils";
import { PublicRoommate } from "../../src/types/roommate";

describe("venmoUtils", () => {
  const mockRoommate: PublicRoommate = {
    id: "test-1",
    name: "Test User",
    amount: 500,
    venmoNote: "Rent payment - Test User",
    image: "https://example.com/image.jpg",
  };

  describe("generateVenmoLink", () => {
    it("should generate a valid Venmo deep link", () => {
      const link = generateVenmoLink(mockRoommate, "testuser");

      expect(link).toContain("venmo://paycharge");
      expect(link).toContain("txn=pay");
      expect(link).toContain("recipients=testuser");
      expect(link).toContain("amount=500");
      expect(link).toContain("note=Rent%20payment%20-%20Test%20User");
    });

    it("should handle username with @ symbol", () => {
      const link = generateVenmoLink(mockRoommate, "@testuser");

      expect(link).toContain("recipients=testuser");
      expect(link).not.toContain("@testuser");
    });

    it("should handle username without @ symbol", () => {
      const link = generateVenmoLink(mockRoommate, "testuser");

      expect(link).toContain("recipients=testuser");
    });

    it("should encode special characters in note", () => {
      const roommateWithSpecialNote = {
        ...mockRoommate,
        venmoNote: "Rent payment - Test & User",
      };

      const link = generateVenmoLink(roommateWithSpecialNote, "testuser");
      expect(link).toContain("note=Rent%20payment%20-%20Test%20%26%20User");
    });
  });

  describe("generateVenmoWebLink", () => {
    it("should generate a valid Venmo web link", () => {
      const link = generateVenmoWebLink(mockRoommate, "testuser");

      expect(link).toContain("https://venmo.com/testuser");
      expect(link).toContain("txn=pay");
      expect(link).toContain("amount=500");
      expect(link).toContain("note=Rent%20payment%20-%20Test%20User");
    });

    it("should handle username with @ symbol", () => {
      const link = generateVenmoWebLink(mockRoommate, "@testuser");

      expect(link).toContain("https://venmo.com/testuser");
      expect(link).not.toContain("@testuser");
    });

    it("should handle username without @ symbol", () => {
      const link = generateVenmoWebLink(mockRoommate, "testuser");

      expect(link).toContain("https://venmo.com/testuser");
    });

    it("should use default note when venmoNote is empty", () => {
      const roommateWithoutNote = {
        ...mockRoommate,
        venmoNote: "",
      };

      const link = generateVenmoWebLink(roommateWithoutNote, "testuser");
      expect(link).toContain("note=Rent%20payment%20for%20Test%20User");
    });
  });

  describe("link generation consistency", () => {
    it("should generate consistent links for same input", () => {
      const link1 = generateVenmoLink(mockRoommate, "testuser");
      const link2 = generateVenmoLink(mockRoommate, "testuser");

      expect(link1).toBe(link2);
    });

    it("should handle different amounts correctly", () => {
      const roommateWithDifferentAmount = {
        ...mockRoommate,
        amount: 750,
      };

      const link = generateVenmoLink(roommateWithDifferentAmount, "testuser");
      expect(link).toContain("amount=750");
    });
  });
});
