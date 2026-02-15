// Core type definitions for the chore management app

export interface TeamMember {
  id: string;           // UUID
  name: string;         // "John Doe"
  color: string;        // "#FF5733" for visual distinction
}

export interface RecurrencePattern {
  type: 'weekly';       // Only weekly for MVP
  daysOfWeek: number[]; // [0,2,4] = Sunday, Tuesday, Thursday (0=Sunday)
  startDate: Date;      // When recurrence starts
  endDate?: Date;       // Optional end date (undefined = infinite)
}

export interface Chore {
  id: string;
  title: string;
  description?: string;
  assignedTo: string | null;  // TeamMember.id or null if unassigned
  recurrence: RecurrencePattern | null; // null = one-time chore
  date?: Date;                // For one-time chores only
  createdAt: Date;
}

// Input types for creating new entities
export interface ChoreInput {
  title: string;
  description?: string;
  assignedTo: string | null;
  recurrence: RecurrencePattern | null;
  date?: Date;
}

export interface TeamMemberInput {
  name: string;
}
