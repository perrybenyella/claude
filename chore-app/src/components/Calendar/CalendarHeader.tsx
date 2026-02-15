import { useAppStore } from '../../store/useAppStore';
import { getMonthYearDisplay, getNextMonth, getPreviousMonth } from '../../utils/dateUtils';

export function CalendarHeader() {
  const currentMonth = useAppStore(state => state.currentMonth);
  const setCurrentMonth = useAppStore(state => state.setCurrentMonth);

  const goToPreviousMonth = () => {
    setCurrentMonth(getPreviousMonth(currentMonth));
  };

  const goToNextMonth = () => {
    setCurrentMonth(getNextMonth(currentMonth));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  return (
    <div className="calendar-header">
      <button
        onClick={goToPreviousMonth}
        className="btn-nav"
        aria-label="Previous month"
      >
        ←
      </button>
      <div className="month-year">
        <h2>{getMonthYearDisplay(currentMonth)}</h2>
        <button onClick={goToToday} className="btn-today">
          Today
        </button>
      </div>
      <button
        onClick={goToNextMonth}
        className="btn-nav"
        aria-label="Next month"
      >
        →
      </button>
    </div>
  );
}
