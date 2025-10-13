import React, { useState } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminDashboard from './AdminDashboard'
import AdminUsers from './AdminUsers'
import AdminEvents from './AdminEvents'
import AdminRegistrations from './AdminRegistrations'
import AdminFeedbacks from './AdminFeedbacks'

import StarfieldBackground from '../StarfieldBackground'
import './AdminPanel.css'

const AdminPanel = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState('dashboard')

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboard />
      case 'users':
        return <AdminUsers />
      case 'events':
        return <AdminEvents />
      case 'registrations':
        return <AdminRegistrations />
      case 'feedbacks':
        return <AdminFeedbacks />

      default:
        return <AdminDashboard />
    }
  }

  return (
    <div className="admin-panel">
      <StarfieldBackground />
      
      <AdminSidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onLogout={onLogout}
      />
      
      <main className="admin-content">
        {renderContent()}
      </main>
    </div>
  )
}

export default AdminPanel