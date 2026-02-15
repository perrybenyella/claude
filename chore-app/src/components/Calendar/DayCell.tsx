import { format, isSameDay, isSameMonth, isToday } from 'date-fns';
import { useAppStore } from '../../store/useAppStore';

interface DayCellProps {
  date: Date;
  currentMonth: Date;
}

export function DayCell({ date, currentMonth }: DayCellProps) {
  const setSelectedDate = useAppStore(state => state.setSelectedDate);
  const getChoresForDate = useAppStore(state => state.getChoresForDate);
  const teamMembers = useAppStore(state => state.teamMembers);

  const isCurrentMonth = isSameMonth(date, currentMonth);
  const isTodayDate = isToday(date);

  const dayNumber = format(date, 'd');
  const chores = getChoresForDate(date);

  // Limit displayed badges to avoid overflow
  const MAX_VISIBLE_BADGES = 3;
  const visibleChores = chores.slice(0, MAX_VISIBLE_BADGES);
  const remainingCount = chores.length - MAX_VISIBLE_BADGES;

  const handleClick = () => {
    setSelectedDate(date);
  };

  const getChoreColor = (assignedTo: string | null): string => {
    if (!assignedTo) return '#999'; // Gray for unassigned
    const member = teamMembers.find(m => m.id === assignedTo);
    return member?.color || '#999';
  };

  const cellClassName = [
    'day-cell',
    !isCurrentMonth && 'other-month',
    isTodayDate && 'today'
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cellClassName}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <div className="day-number">{dayNumber}</div>
      <div className="chore-badges">
        {visibleChores.map(chore => (
          <div
            key={chore.id}
            className="chore-badge"
            style={{ backgroundColor: getChoreColor(chore.assignedTo) }}
            title={chore.title}
          >
            {chore.title}
          </div>
        ))}
        {remainingCount > 0 && (
          <div className="chore-badge more-badge">
            +{remainingCount} more
          </div>
        )}
      </div>
    </div>
  );
}
