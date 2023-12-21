import React from 'react'
import DashboardToggle from './dashborad/DashboardToggle';
import CreateRoomBtnModal from './CreateRoomBtnModal';

const Sidebar = () => {
  return (
    <div className="h-100 pt-2">
     <div>
      <DashboardToggle/>
      <CreateRoomBtnModal/>
     </div>
    </div>
  )
}

export default Sidebar;
