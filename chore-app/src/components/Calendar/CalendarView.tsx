import { CalendarHeader } from './CalendarHeader';
import { MonthView } from './MonthView';

export function CalendarView() {
  return (
    <div className="calendar-view">
      <CalendarHeader />
      <MonthView />
    </div>
  );
}
