import React from 'react'
import './Sidebar.scss'
import SidebarChat from './SidebarChat'
import SidebarHeader from './SidebarHeader'
import SidebarSearch from './SidebarSearch'

function Sidebar() {
  return (
    <div className="sidebar">
      <SidebarHeader />
      <SidebarSearch />
      <SidebarChat />
    </div>
  )
}

export default Sidebar
