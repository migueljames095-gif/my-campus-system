import { AlertCircle, CheckCircle, Clock } from 'lucide-react'

export default function TicketCard({ ticketKey, ticket }) {
  const createdDate = new Date(ticket.createdAt).toLocaleString()
  const isFixed = ticket.status === 'FIXED'

  return (
    <div className={`rounded-lg p-4 border-l-4 ${isFixed ? 'bg-green-50 dark:bg-green-900/20 border-green-500' : 'bg-red-50 dark:bg-red-900/20 border-red-500'}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-2 flex-1">
          {isFixed ? (
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          )}
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">#{ticket.ticketId}</p>
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm">{ticket.problemType}</h4>
          </div>
        </div>
      </div>

      {/* Problem Type Badge */}
      <div className="mb-3">
        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
          isFixed 
            ? 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200'
            : 'bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200'
        }`}>
          {isFixed ? 'FIXED' : 'OPEN'}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-700 dark:text-slate-300 mb-3 line-clamp-2">
        {ticket.description}
      </p>

      {/* Device & Time */}
      <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <p>Device: <span className="font-medium text-slate-900 dark:text-white">{ticket.deviceId}</span></p>
        <div className="flex items-center gap-2">
          <Clock className="w-3 h-3" />
          <span>{createdDate}</span>
        </div>
        {isFixed && ticket.fixedBy && (
          <p>Fixed by: <span className="font-medium text-slate-900 dark:text-white">{ticket.fixedBy}</span></p>
        )}
      </div>
    </div>
  )
}
