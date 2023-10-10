import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useState } from 'react'

const AppLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false)
  return (
    <>
      <div className="bg-base-200 flex relative">
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <Outlet context={{ showSidebar, setShowSidebar }} />
      </div>
    </>
  )
}

export default AppLayout
