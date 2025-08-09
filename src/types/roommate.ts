export interface Roommate {
  email: string | string[];
  id: string;
  name: string;
  amount: number;
  venmoUsername?: string; // Your Venmo username
  venmoNote?: string; // Default note for Venmo payments
  image?: string; // URL for roommate's photo
  birthday?: string; // Birthday in DD/MM format for password
}
