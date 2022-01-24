import React from 'react';
import { Button, Drawer, IconButton } from 'rsuite';
import Dashboard from '.';
import { useModalState, useMediaQuery } from '../../misc/custom-hooks';

const DashboardToggle = () => {
  const { isOpen, close, open } = useModalState();
  const isMobile = useMediaQuery('(max-width:992px)');
  return (
    <div>
      <IconButton block appearance="primary" icon="" onClick={open}>
        Dashboard
      </IconButton>
      <Drawer open={isOpen} onClose={close} placement={'left'} full={isMobile}>
        <Dashboard />
      </Drawer>
    </div>
  );
};

export default DashboardToggle;
