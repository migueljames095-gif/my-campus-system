import { useState, useEffect } from 'react'
import { ref, onValue, off } from 'firebase/database'
import { useAuth } from '../contexts/AuthContext'
import TicketCard from './TicketCard'

export default function TicketsSection() {
  const { db } = useAuth()
  const [tickets, setTickets] = useState({})
  const [activeTab, setActiveTab] = useState('open')

  useEffect(() => {
    const ticketsRef = ref(db, 'tickets')
    
    const unsubscribe = onValue(ticketsRef, (snapshot) => {
      const data = snapshot.val() || {}
      setTickets(data)
    })

    return () => off(ticketsRef, 'value', unsubscribe)
  }, [db])

  const openTickets = Object.entries(tickets).filter(
    ([key, ticket]) => ticket.status === 'OPEN' && key !== 'lastTicketId'
  )
  const fixedTickets = Object.entries(tickets).filter(
    ([key, ticket]) => ticket.status === 'FIXED' && key !== 'lastTicketId'
  )

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
      {/* Header */}
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">🎫 Tickets</h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setActiveTab('open')}
          className={`px-4 py-2 font-medium transition-colors ${activeTab === 'open' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Open ({openTickets.length})
        </button>
        <button
          onClick={() => setActiveTab('fixed')}
          className={`px-4 py-2 font-medium transition-colors ${activeTab === 'fixed' ? 'text-green-600 border-b-2 border-green-600' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Fixed ({fixedTickets.length})
        </button>
      </div>

      {/* Tickets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeTab === 'open' ? (
          openTickets.length === 0 ? (
            <p className="text-slate-600 dark:text-slate-400 col-span-full text-center py-8">No open tickets</p>
          ) : (
            openTickets.map(([key, ticket]) => (
              <TicketCard key={key} ticketKey={key} ticket={ticket} />
            ))
          )
        ) : fixedTickets.length === 0 ? (
          <p className="text-slate-600 dark:text-slate-400 col-span-full text-center py-8">No fixed tickets</p>
        ) : (
          fixedTickets.map(([key, ticket]) => (
            <TicketCard key={key} ticketKey={key} ticket={ticket} />
          ))
        )}
      </div>
    </div>
  )
}
