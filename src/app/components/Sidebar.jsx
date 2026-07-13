import { Link, useLocation } from 'react-router'
import { useAuth } from '../contexts/AuthContext'
import { LayoutDashboard, LogOut, Settings } from 'lucide-react'

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation()
  const { logout } = useAuth()

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
  }

  return (
    <aside
      className={`fixed lg:relative w-64 h-screen bg-slate-900 text-white transition-transform duration-300 ease-in-out transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 z-40 lg:z-0 flex flex-col`}
    >
      {/* Sidebar Header */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          🌐 Campus NET
        </h1>
        <p className="text-sm text-slate-400 mt-1">Network Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <Link
          to="/"
          onClick={onClose}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            isActive('/') 
              ? 'bg-blue-600 text-white' 
              : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-slate-700 space-y-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-red-600/20 hover:text-red-400 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
