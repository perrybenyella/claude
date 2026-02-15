import { create } from 'zustand';
import { TeamMember, Chore, ChoreInput } from '../types';
import { getChoresForDate as filterChoresForDate } from '../utils/recurrenceUtils';
import { startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

interface AppState {
  // Team members
  teamMembers: TeamMember[];
  addTeamMember: (name: string) => void;
  removeTeamMember: (id: string) => void;

  // Chores
  chores: Chore[];
  addChore: (chore: ChoreInput) => void;
  removeChore: (id: string) => void;
  updateChore: (choreId: string, updates: Partial<Chore>) => void;

  // Calendar state
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;

  // Computed helpers
  getChoresForDate: (date: Date) => Chore[];
  getChoresForMonth: (date: Date) => Chore[];
}

// Helper to generate random color for team members
const generateRandomColor = (): string => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
    '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
    '#F8B739', '#52B788', '#F06595', '#748FFC'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Helper to generate UUID
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  teamMembers: [],
  chores: [],
  selectedDate: null,
  currentMonth: new Date(),

  // Team member actions
  addTeamMember: (name: string) => {
    const newMember: TeamMember = {
      id: generateId(),
      name: name.trim(),
      color: generateRandomColor()
    };
    set(state => ({
      teamMembers: [...state.teamMembers, newMember]
    }));
  },

  removeTeamMember: (id: string) => {
    set(state => ({
      teamMembers: state.teamMembers.filter(member => member.id !== id),
      // Unassign any chores assigned to this member
      chores: state.chores.map(chore =>
        chore.assignedTo === id
          ? { ...chore, assignedTo: null }
          : chore
      )
    }));
  },

  // Chore actions
  addChore: (choreInput: ChoreInput) => {
    const newChore: Chore = {
      id: generateId(),
      ...choreInput,
      createdAt: new Date()
    };
    set(state => ({
      chores: [...state.chores, newChore]
    }));
  },

  removeChore: (id: string) => {
    set(state => ({
      chores: state.chores.filter(chore => chore.id !== id)
    }));
  },

  updateChore: (choreId: string, updates: Partial<Chore>) => {
    set(state => ({
      chores: state.chores.map(chore =>
        chore.id === choreId
          ? { ...chore, ...updates }
          : chore
      )
    }));
  },

  // Calendar actions
  setSelectedDate: (date: Date | null) => {
    set({ selectedDate: date });
  },

  setCurrentMonth: (date: Date) => {
    set({ currentMonth: date });
  },

  // Computed helpers
  getChoresForDate: (date: Date) => {
    const state = get();
    return filterChoresForDate(state.chores, date);
  },

  getChoresForMonth: (date: Date) => {
    const state = get();
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);

    // Filter chores that might appear in this month
    return state.chores.filter(chore => {
      // One-time chores
      if (!chore.recurrence && chore.date) {
        return isWithinInterval(chore.date, { start: monthStart, end: monthEnd });
      }

      // Recurring chores - check if they have any occurrence in this month
      if (chore.recurrence) {
        const { startDate, endDate } = chore.recurrence;

        // If recurrence hasn't started yet
        if (startDate > monthEnd) return false;

        // If recurrence has ended
        if (endDate && endDate < monthStart) return false;

        // Otherwise, this recurring chore might appear in this month
        return true;
      }

      return false;
    });
  }
}));
