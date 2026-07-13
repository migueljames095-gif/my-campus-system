# Campus Network Dashboard

Modern React frontend with CampusNet design integrated with your existing Firebase backend.

## Features

✨ **Modern UI/UX**
- Beautiful gradient designs
- Responsive layout (mobile, tablet, desktop)
- Dark mode support
- Smooth animations and transitions

🔐 **Authentication**
- Firebase authentication
- Session persistence
- Secure logout

📊 **Dashboard**
- Real-time device monitoring
- Network status indicators
- Device details with latency and signal metrics
- Ticket management system

🎫 **Ticket Management**
- Open tickets tracking
- Fixed tickets history
- Problem categorization
- Real-time updates

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS + Custom CSS
- **Routing**: React Router 7
- **Backend**: Firebase Realtime Database
- **Icons**: Lucide React
- **Components**: Radix UI

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Visit `http://localhost:5173`

## Building

```bash
npm run build
```

## Deployment

```bash
npm run deploy
```

## Project Structure

```
src/
├── app/
│   ├── components/          # React components
│   ├── contexts/           # Context providers (Auth)
│   ├── routes.jsx          # Route definitions
│   └── App.jsx             # Main app component
├── styles/                 # Global styles
├── main.jsx               # Entry point
functions/                 # Firebase Cloud Functions
public/                    # Static assets
```

## Environment Variables

Firebase config is embedded in `src/app/contexts/AuthContext.jsx`. Update if needed.

## Usage

1. Login with your Firebase credentials
2. View all registered devices on the dashboard
3. Click on a device to see detailed metrics
4. Monitor tickets (open and fixed)
5. Track network performance in real-time

## Notes

- All existing Firebase backend logic is preserved
- The UI is fully responsive
- Device monitoring runs in real-time
- Ticket system is integrated with your existing Firebase database
