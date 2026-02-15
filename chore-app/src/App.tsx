import { useEffect } from 'react';
import { CalendarView } from './components/Calendar/CalendarView';
import { TeamMemberList } from './components/Team/TeamMemberList';
import { TeamMemberForm } from './components/Team/TeamMemberForm';
import { ChoreForm } from './components/Chores/ChoreForm';
import { ChoreList } from './components/Chores/ChoreList';
import { useAppStore } from './store/useAppStore';
import './styles/index.css';

function App() {
  const teamMembers = useAppStore(state => state.teamMembers);
  const chores = useAppStore(state => state.chores);

  // Warn before leaving if there's data
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (chores.length > 0 || teamMembers.length > 0) {
        e.preventDefault();
        e.returnValue = 'You have unsaved data. Are you sure you want to leave?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [chores.length, teamMembers.length]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Office Chore Manager</h1>
        <div className="team-count">
          👥 Team: {teamMembers.length} {teamMembers.length === 1 ? 'member' : 'members'}
        </div>
      </header>

      <div className="app-content">
        <aside className="sidebar">
          <section className="sidebar-section">
            <h2>Team Members</h2>
            <TeamMemberForm />
            <TeamMemberList />
          </section>

          <section className="sidebar-section">
            <ChoreForm />
          </section>
        </aside>

        <main className="main-content">
          <CalendarView />
          <ChoreList />
        </main>
      </div>
    </div>
  );
}

export default App;
