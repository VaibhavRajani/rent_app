import {
  getAllRoommates,
  getRoommateById,
  getRoommateIds,
} from "../../src/utils/roommateUtils";
import { PublicRoommate } from "../../src/types/roommate";

describe("roommateUtils", () => {
  describe("getAllRoommates", () => {
    it("should return an array of roommates", () => {
      const roommates = getAllRoommates();
      expect(roommates).toBeDefined();
      expect(Array.isArray(roommates)).toBe(true);
    });

    it("should return roommates with required properties", () => {
      const roommates = getAllRoommates();
      if (roommates.length > 0) {
        const roommate = roommates[0];
        expect(roommate.id).toBeDefined();
        expect(roommate.name).toBeDefined();
        expect(roommate.amount).toBeDefined();
        expect(roommate.venmoNote).toBeDefined();
        expect(roommate.image).toBeDefined();
      }
    });
  });

  describe("getRoommateById", () => {
    it("should return a roommate when given a valid ID", () => {
      const roommates = getAllRoommates();
      if (roommates.length > 0) {
        const firstRoommate = roommates[0];
        const foundRoommate = getRoommateById(firstRoommate.id);
        expect(foundRoommate).toBeDefined();
        expect(foundRoommate?.id).toBe(firstRoommate.id);
      }
    });

    it("should return undefined when given an invalid ID", () => {
      const foundRoommate = getRoommateById("invalid-id");
      expect(foundRoommate).toBeUndefined();
    });
  });

  describe("getRoommateIds", () => {
    it("should return an array of roommate IDs", () => {
      const ids = getRoommateIds();
      expect(ids).toBeDefined();
      expect(Array.isArray(ids)).toBe(true);
    });

    it("should return the same number of IDs as roommates", () => {
      const roommates = getAllRoommates();
      const ids = getRoommateIds();
      expect(ids.length).toBe(roommates.length);
    });

    it("should return valid IDs", () => {
      const ids = getRoommateIds();
      ids.forEach((id) => {
        expect(typeof id).toBe("string");
        expect(id.length).toBeGreaterThan(0);
      });
    });
  });
});
