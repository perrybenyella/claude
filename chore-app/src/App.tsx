import { useEffect } from 'react';
import { CalendarView } from './components/Calendar/CalendarView';
import { TeamMemberList } from './components/Team/TeamMemberList';
import { TeamMemberForm } from './components/Team/TeamMemberForm';
import { ChoreForm } from './components/Chores/ChoreForm';
import { ChoreList } from './components/Chores/ChoreList';
import { useAppStore, rehydrateStore, subscribeToStoreChanges } from './store/useAppStore';
import { initTabSync, cleanupTabSync, broadcastStateUpdate } from './utils/tabSyncManager';
import './styles/index.css';

function App() {
  const teamMembers = useAppStore(state => state.teamMembers);

  // Initialize cross-tab synchronization
  useEffect(() => {
    // Initialize tab sync - when other tabs update, rehydrate our store
    initTabSync(() => {
      rehydrateStore();
    });

    // Subscribe to our store changes and broadcast to other tabs
    const unsubscribe = subscribeToStoreChanges(() => {
      broadcastStateUpdate();
    });

    // Cleanup on unmount
    return () => {
      cleanupTabSync();
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  // Note: Data is now persisted to localStorage, so it won't be lost on page refresh
  // The beforeunload warning has been removed since data is automatically saved

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
