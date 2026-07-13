import { createBrowserRouter } from 'react-router'
import Root from './components/Root'
import LoginPage from './components/LoginPage'
import DashboardPage from './components/DashboardPage'
import DeviceDetailsPage from './components/DeviceDetailsPage'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'device/:deviceId', element: <DeviceDetailsPage /> },
    ],
  },
])
