import React, { useCallback } from 'react';
import { Button, Drawer, IconButton } from 'rsuite';
import Dashboard from '.';
import { isOfflineForDatabase } from '../../context/profile.context';
import { useModalState, useMediaQuery } from '../../misc/custom-hooks';
import { auth, database } from '../../misc/firebase';

const DashboardToggle = () => {
  const { isOpen, close, open } = useModalState();
  const isMobile = useMediaQuery('(max-width:992px)');
  const onSignOut = useCallback(() => {
    database
      .ref(`/status/${auth.currentUser.uid}`)
      .set(isOfflineForDatabase)
      .then(() => {
        auth.signOut();
        close();
        // userStatusRef.set(isOnlineForDatabase);
      })
      .catch(err => {
        console.log('alert for error');
        //alert.error(err.message)
      });
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
