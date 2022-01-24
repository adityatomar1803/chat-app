import React from 'react';
import { Button, Drawer, IconButton } from 'rsuite';
import Dashboard from '.';
import { useModalState } from '../../misc/custom-hooks';

const DashboardToggle = () => {
  const { isOpen, close, open } = useModalState();
  return (
    <div>
      <IconButton block appearance="primary" icon="" onClick={open}>
        Dashboard
      </IconButton>
      <Drawer open={isOpen} onClose={close} placement={'left'}>
        <Dashboard />
      </Drawer>
    </div>
  );
};

export default DashboardToggle;
