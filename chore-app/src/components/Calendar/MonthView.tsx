import { useAppStore } from '../../store/useAppStore';
import { getMonthViewDays } from '../../utils/dateUtils';
import { DayCell } from './DayCell';

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function MonthView() {
  const currentMonth = useAppStore(state => state.currentMonth);
  const days = getMonthViewDays(currentMonth);

  return (
    <div className="month-view">
      <div className="weekday-header">
        {WEEKDAY_LABELS.map(day => (
          <div key={day} className="weekday-label">
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-grid">
        {days.map(day => (
          <DayCell
            key={day.toISOString()}
            date={day}
            currentMonth={currentMonth}
          />
        ))}
      </div>
    </div>
  );
}
