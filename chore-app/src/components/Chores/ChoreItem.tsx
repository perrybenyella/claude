import { Chore } from '../../types';
import { useAppStore } from '../../store/useAppStore';

interface ChoreItemProps {
  chore: Chore;
}

export function ChoreItem({ chore }: ChoreItemProps) {
  const teamMembers = useAppStore(state => state.teamMembers);
  const removeChore = useAppStore(state => state.removeChore);

  const assignedMember = chore.assignedTo
    ? teamMembers.find(m => m.id === chore.assignedTo)
    : null;

  const handleDelete = () => {
    const confirmMessage = chore.recurrence
      ? `Delete recurring chore "${chore.title}"? This will remove all future occurrences.`
      : `Delete chore "${chore.title}"?`;

    if (confirm(confirmMessage)) {
      removeChore(chore.id);
    }
  };

  const getRecurrenceText = () => {
    if (!chore.recurrence) return null;

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const days = chore.recurrence.daysOfWeek.map(d => dayNames[d]).join(', ');
    return `Repeats weekly on ${days}`;
  };

  return (
    <div className="chore-item">
      <div className="chore-content">
        <div className="chore-header">
          <h4 className="chore-title">{chore.title}</h4>
          {assignedMember && (
            <span
              className="chore-assignee"
              style={{ backgroundColor: assignedMember.color }}
            >
              {assignedMember.name}
            </span>
          )}
        </div>
        {chore.description && (
          <p className="chore-description">{chore.description}</p>
        )}
        {getRecurrenceText() && (
          <p className="chore-recurrence">{getRecurrenceText()}</p>
        )}
      </div>
      <button
        onClick={handleDelete}
        className="btn-delete-chore"
        aria-label={`Delete ${chore.title}`}
      >
        Delete
      </button>
    </div>
  );
}
