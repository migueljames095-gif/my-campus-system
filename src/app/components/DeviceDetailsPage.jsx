import { useParams, useNavigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext'
import { ArrowLeft } from 'lucide-react'
import { useState, useEffect } from 'react'
import { ref, get } from 'firebase/database'

export default function DeviceDetailsPage() {
  const { deviceId } = useParams()
  const navigate = useNavigate()
  const { db } = useAuth()
  const [device, setDevice] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const deviceRef = ref(db, `devices/${deviceId}`)
    get(deviceRef).then((snapshot) => {
      if (snapshot.exists()) {
        setDevice(snapshot.val())
      }
      setLoading(false)
    })
  }, [deviceId, db])

  if (loading) {
    return (
      <div className="p-4 md:p-8">
        <p className="text-center text-slate-600 dark:text-slate-400">Loading device details...</p>
      </div>
    )
  }

  if (!device) {
    return (
      <div className="p-4 md:p-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <p className="text-center text-slate-600 dark:text-slate-400">Device not found</p>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Dashboard
      </button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
          {device.deviceName || deviceId}
        </h1>
        <p className="text-slate-600 dark:text-slate-400">Device ID: {deviceId}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">Latency</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{device.latency || 0}ms</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">Signal Strength</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{device.rssi || 0}dBm</p>
        </div>
      </div>

      {/* Details */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Device Information</h2>
        <div className="space-y-3 text-slate-700 dark:text-slate-300">
          {device.deviceLocation && (
            <p><span className="font-medium">Location:</span> {device.deviceLocation}</p>
          )}
          {device.description && (
            <p><span className="font-medium">Description:</span> {device.description}</p>
          )}
          <p><span className="font-medium">Status:</span> {device.internet ? 'Online' : 'Offline'}</p>
          <p><span className="font-medium">Last Seen:</span> {new Date(device.last_seen || Date.now()).toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}
