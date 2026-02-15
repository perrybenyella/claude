import { useAppStore } from '../../store/useAppStore';
import { ChoreItem } from './ChoreItem';
import { format } from 'date-fns';

export function ChoreList() {
  const selectedDate = useAppStore(state => state.selectedDate);
  const getChoresForDate = useAppStore(state => state.getChoresForDate);
  const setSelectedDate = useAppStore(state => state.setSelectedDate);

  if (!selectedDate) {
    return (
      <div className="chore-list empty">
        <p>Click on a date to view chores</p>
      </div>
    );
  }

  const chores = getChoresForDate(selectedDate);

  const handleClose = () => {
    setSelectedDate(null);
  };

  return (
    <div className="chore-list-panel">
      <div className="chore-list-header">
        <h3>Chores for {format(selectedDate, 'MMMM d, yyyy')}</h3>
        <button onClick={handleClose} className="btn-close" aria-label="Close">
          ×
        </button>
      </div>
      <div className="chore-list">
        {chores.length === 0 ? (
          <p className="empty-state">No chores scheduled for this day</p>
        ) : (
          chores.map(chore => (
            <ChoreItem key={chore.id} chore={chore} />
          ))
        )}
      </div>
    </div>
  );
}
