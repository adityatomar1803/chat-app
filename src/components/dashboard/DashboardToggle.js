import React, { useCallback } from 'react';
import { Button, Drawer, IconButton } from 'rsuite';
import Dashboard from '.';
import { useModalState, useMediaQuery } from '../../misc/custom-hooks';
import { auth } from '../../misc/firebase';

const DashboardToggle = () => {
  const { isOpen, close, open } = useModalState();
  const isMobile = useMediaQuery('(max-width:992px)');
  const onSignOut = useCallback(() => {
    auth.signOut();
    close();
  }, [close]);

  return (
    <div>
      <IconButton block appearance="primary" icon="" onClick={open}>
        Dashboard
      </IconButton>
      <Drawer open={isOpen} onClose={close} placement={'left'} full={isMobile}>
        <Dashboard onSignOut={onSignOut} />
      </Drawer>
    </div>
  );
};

export default DashboardToggle;
