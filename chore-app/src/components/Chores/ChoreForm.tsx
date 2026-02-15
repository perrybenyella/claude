import { useState, FormEvent } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ChoreInput, RecurrencePattern } from '../../types';

export function ChoreForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState<string | null>(null);
  const [isRecurring, setIsRecurring] = useState(false);
  const [oneTimeDate, setOneTimeDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  const teamMembers = useAppStore(state => state.teamMembers);
  const addChore = useAppStore(state => state.addChore);

  const DAYS_OF_WEEK = [
    { label: 'Sun', value: 0 },
    { label: 'Mon', value: 1 },
    { label: 'Tue', value: 2 },
    { label: 'Wed', value: 3 },
    { label: 'Thu', value: 4 },
    { label: 'Fri', value: 5 },
    { label: 'Sat', value: 6 }
  ];

  const toggleDay = (day: number) => {
    setSelectedDays(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day].sort()
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please enter a chore title');
      return;
    }

    let choreInput: ChoreInput;

    if (isRecurring) {
      if (selectedDays.length === 0) {
        alert('Please select at least one day for recurring chores');
        return;
      }

      const recurrence: RecurrencePattern = {
        type: 'weekly',
        daysOfWeek: selectedDays,
        startDate: new Date()
      };

      choreInput = {
        title: title.trim(),
        description: description.trim() || undefined,
        assignedTo,
        recurrence
      };
    } else {
      choreInput = {
        title: title.trim(),
        description: description.trim() || undefined,
        assignedTo,
        recurrence: null,
        date: new Date(oneTimeDate)
      };
    }

    addChore(choreInput);

    // Reset form
    setTitle('');
    setDescription('');
    setAssignedTo(null);
    setSelectedDays([]);
  };

  return (
    <form onSubmit={handleSubmit} className="chore-form">
      <h3>Add Chore</h3>

      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Chore title"
          className="form-input"
          maxLength={100}
        />
      </div>

      <div className="form-group">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          className="form-textarea"
          rows={2}
          maxLength={500}
        />
      </div>

      <div className="form-group">
        <label htmlFor="assign-to">Assign to:</label>
        <select
          id="assign-to"
          value={assignedTo || ''}
          onChange={(e) => setAssignedTo(e.target.value || null)}
          className="form-select"
        >
          <option value="">Unassigned</option>
          {teamMembers.map(member => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group recurrence-group">
        <label className="radio-label">
          <input
            type="radio"
            name="recurrence-type"
            checked={!isRecurring}
            onChange={() => setIsRecurring(false)}
          />
          <span>One-time</span>
        </label>
        {!isRecurring && (
          <input
            type="date"
            value={oneTimeDate}
            onChange={(e) => setOneTimeDate(e.target.value)}
            className="form-date"
          />
        )}
      </div>

      <div className="form-group recurrence-group">
        <label className="radio-label">
          <input
            type="radio"
            name="recurrence-type"
            checked={isRecurring}
            onChange={() => setIsRecurring(true)}
          />
          <span>Weekly</span>
        </label>
        {isRecurring && (
          <div className="days-selector">
            {DAYS_OF_WEEK.map(day => (
              <label key={day.value} className="day-checkbox">
                <input
                  type="checkbox"
                  checked={selectedDays.includes(day.value)}
                  onChange={() => toggleDay(day.value)}
                />
                <span>{day.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <button type="submit" className="btn-add-chore">
        Add Chore
      </button>
    </form>
  );
}
