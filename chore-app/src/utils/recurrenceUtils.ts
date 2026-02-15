import { isSameDay } from 'date-fns';
import { Chore } from '../types';

/**
 * Checks if a chore occurs on a specific date
 * @param chore The chore to check
 * @param date The date to check against
 * @returns true if the chore occurs on the given date
 */
export function doesChoreOccurOnDate(chore: Chore, date: Date): boolean {
  // One-time chores: direct date match
  if (!chore.recurrence) {
    return chore.date ? isSameDay(chore.date, date) : false;
  }

  const pattern = chore.recurrence;
  const dayOfWeek = date.getDay(); // 0-6 (Sunday = 0)

  // Check if date is in recurrence range
  if (date < pattern.startDate) return false;
  if (pattern.endDate && date > pattern.endDate) return false;

  // Check if day of week matches pattern
  return pattern.daysOfWeek.includes(dayOfWeek);
}

/**
 * Gets all chores that occur on a specific date
 * @param chores List of all chores
 * @param date The date to filter by
 * @returns Array of chores that occur on the given date
 */
export function getChoresForDate(chores: Chore[], date: Date): Chore[] {
  return chores.filter(chore => doesChoreOccurOnDate(chore, date));
}
