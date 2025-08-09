// Public roommate data (safe to expose to client)
export interface PublicRoommate {
  id: string;
  name: string;
  amount: number;
  venmoNote: string;
  image?: string;
}

// Private roommate data (server-side only)
export interface PrivateRoommate extends PublicRoommate {
  email: string;
  birthday: string; // DD/MM format
}

// Alias for backward compatibility
export type Roommate = PrivateRoommate;
