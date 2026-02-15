import { useState, FormEvent } from 'react';
import { useAppStore } from '../../store/useAppStore';

export function TeamMemberForm() {
  const [name, setName] = useState('');
  const addTeamMember = useAppStore(state => state.addTeamMember);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      addTeamMember(name);
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="team-member-form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Team member name"
        className="team-member-input"
        maxLength={50}
      />
      <button type="submit" className="btn-add-member">
        Add Member
      </button>
    </form>
  );
}
