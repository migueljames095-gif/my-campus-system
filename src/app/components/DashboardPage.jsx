import { useState, useEffect } from 'react'
import { ref, onValue, off } from 'firebase/database'
import { useAuth } from '../contexts/AuthContext'
import DeviceCard from './DeviceCard'
import TicketsSection from './TicketsSection'
import { Plus } from 'lucide-react'

export default function DashboardPage() {
  const { db } = useAuth()
  const [devices, setDevices] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const devicesRef = ref(db, 'devices')
    
    const unsubscribe = onValue(devicesRef, (snapshot) => {
      const data = snapshot.val() || {}
      setDevices(data)
      setLoading(false)
    })

    return () => off(devicesRef, 'value', unsubscribe)
  }, [db])

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
          📊 Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400">Monitor your network devices and tickets</p>
      </div>

      {/* Devices Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">🌐 Devices</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <Plus className="w-5 h-5" />
            Add Device
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400">Loading devices...</p>
          </div>
        ) : Object.keys(devices).length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-lg">
            <p className="text-slate-600 dark:text-slate-400">No devices found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(devices).map(([id, device]) => (
              <DeviceCard key={id} id={id} device={device} />
            ))}
          </div>
        )}
      </div>

      {/* Tickets Section */}
      <TicketsSection />
    </div>
  )
}
