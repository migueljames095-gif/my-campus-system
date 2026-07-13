import { Link } from 'react-router'
import { Activity, Wifi, Signal } from 'lucide-react'

export default function DeviceCard({ id, device }) {
  const isOnline = device.internet
  const lastSeen = device.last_seen ? new Date(device.last_seen).toLocaleString() : 'Never'

  return (
    <Link to={`/device/${id}`}>
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-slate-200 dark:border-slate-700 cursor-pointer h-full">
        {/* Status Indicator */}
        <div className="flex items-center justify-between mb-4">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${isOnline ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
            <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className={`text-sm font-medium ${isOnline ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
              {isOnline ? 'ONLINE' : 'OFFLINE'}
            </span>
          </div>
          <Activity className="w-5 h-5 text-slate-400" />
        </div>

        {/* Device Name */}
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
          {device.deviceName || id}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">ID: {id}</p>

        {/* Location */}
        {device.deviceLocation && (
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
            📍 {device.deviceLocation}
          </p>
        )}

        {/* Stats */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
              <Wifi className="w-4 h-4" />
              Latency
            </span>
            <span className="font-semibold text-slate-900 dark:text-white">{device.latency || 0}ms</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
              <Signal className="w-4 h-4" />
              Signal
            </span>
            <span className="font-semibold text-slate-900 dark:text-white">{device.rssi || 0}dBm</span>
          </div>
        </div>

        {/* Last Seen */}
        <p className="text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-3">
          Last seen: {lastSeen}
        </p>
      </div>
    </Link>
  )
}
