# Office Chore Manager

A web-based chore management application for small office teams. Track and assign recurring and one-time chores with a beautiful calendar interface.

## Features

- 📅 **Calendar View** - Month view with Outlook-style design
- 👥 **Team Management** - Add/remove team members with color coding
- ✅ **Chore Management** - Create one-time or recurring chores
- 🔄 **Weekly Recurrence** - Set chores to repeat on specific days of the week
- 🎨 **Visual Assignment** - Color-coded chore badges by team member
- 💾 **In-Memory Storage** - Data persists during session (resets on page refresh)
- 🌐 **Offline Support** - Works completely offline once loaded

## Getting Started

### Prerequisites

- Node.js 18+ (you have v24.13.1 ✓)

### Installation

The project is already set up! Just run:

```bash
cd chore-app
npm run dev
```

Then open your browser to **http://localhost:5173**

### Building for Production

To create a production build that can be deployed or opened offline:

```bash
npm run build
```

This creates a `dist/` folder. You can:
- Open `dist/index.html` directly in a browser (works offline!)
- Deploy the `dist` folder to any static hosting service
- Share the folder with your team on a network drive

## How to Use

### 1. Add Team Members
- Enter a name in the "Team Members" section
- Click "Add Member"
- Each member gets a unique color for visual distinction
- Remove members by clicking the × button

### 2. Create a One-Time Chore
- Fill in the chore title (required)
- Add an optional description
- Assign to a team member (or leave unassigned)
- Select "One-time" and choose a date
- Click "Add Chore"

### 3. Create a Recurring Chore
- Fill in the chore title and description
- Assign to a team member
- Select "Weekly"
- Check the days of the week when this chore repeats
- Click "Add Chore"
- The chore will appear on all matching days in the calendar

### 4. View and Manage Chores
- Click any calendar day to see all chores for that date
- Chores are displayed as colored badges (matching assignee color)
- Click "Delete" to remove a chore
- Deleting a recurring chore removes all future occurrences

### 5. Navigate the Calendar
- Use ← → arrows to move between months
- Click "Today" to return to the current month
- Current day is highlighted in orange

## Technical Details

### Built With
- React 18 + TypeScript
- Vite (build tool)
- Zustand (state management)
- date-fns (date utilities)

### Architecture
- Single-page application (SPA)
- Client-side only (no backend required)
- In-memory state management
- Fully responsive design

### Data Persistence
⚠️ **Important**: Data is stored in-memory only and will be lost when you:
- Refresh the page
- Close the browser
- Navigate away from the app

The app will warn you before leaving if you have data. If you need persistent storage, localStorage can easily be added in the future.

## Browser Support

Works in all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Development

### Project Structure
```
src/
├── components/
│   ├── Calendar/      # Calendar display components
│   ├── Chores/        # Chore management components
│   └── Team/          # Team member components
├── store/             # Zustand state management
├── types/             # TypeScript type definitions
├── utils/             # Helper functions (dates, recurrence)
└── styles/            # CSS styling
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Future Enhancements

Potential features to add:
- localStorage persistence
- Completion tracking with checkboxes
- Export/import chores as JSON
- Email notifications (requires backend)
- Multi-user sync (requires backend + database)
- Mobile app version

## License

This is a custom internal tool. Use freely within your organization.

## Support

For issues or questions, contact your development team.
