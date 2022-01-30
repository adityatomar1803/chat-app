import React from 'react';
import CreateRoomBtnModal from './dashboard/CreateRoomBtnModal';
import DashboardToggle from './dashboard/DashboardToggle';

const Sidebar = () => {
  return (
    <div>
      <DashboardToggle />
      <CreateRoomBtnModal />
    </div>
  );
};

export default Sidebar;
