import { useAppStore } from '../../store/useAppStore';

export function TeamMemberList() {
  const teamMembers = useAppStore(state => state.teamMembers);
  const removeTeamMember = useAppStore(state => state.removeTeamMember);

  const handleRemove = (id: string, name: string) => {
    if (confirm(`Remove ${name} from the team? Any assigned chores will be unassigned.`)) {
      removeTeamMember(id);
    }
  };

  if (teamMembers.length === 0) {
    return (
      <div className="team-member-list empty">
        <p className="empty-state">No team members yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="team-member-list">
      {teamMembers.map(member => (
        <div key={member.id} className="team-member-item">
          <div className="member-info">
            <span
              className="member-color"
              style={{ backgroundColor: member.color }}
            />
            <span className="member-name">{member.name}</span>
          </div>
          <button
            onClick={() => handleRemove(member.id, member.name)}
            className="btn-remove"
            aria-label={`Remove ${member.name}`}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
