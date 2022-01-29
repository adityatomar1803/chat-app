import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookMessenger } from 'react-icons/fa';
import { auth } from '../../misc/firebase';
import { Button, Tag } from 'rsuite';
import { Icon } from '@rsuite/icons';
import firebase from 'firebase/app';

const ProviderBlock = () => {
  const [isConnected, setIsConnected] = useState({
    'google.com': auth.currentUser.providerData.some(
      data => data.providerId === 'google.com'
    ),
    'facebook.com': auth.currentUser.providerData.some(
      data => data.providerId === 'facebook.com'
    ),
  });

  const updateIsConnected = (providerId, value) => {
    setIsConnected(p => {
      return {
        ...p,
        [providerId]: value,
      };
    });
  };

  const unlink = async providerId => {
    try {
      if (auth.currentUser.providerData.length === 1) {
        throw new Error(`you can not disconnect from ${providerId}`);
      }

      await auth.currentUser.unlink(providerId);

      updateIsConnected(providerId, false);
      //alert disconnected from provider id
    } catch (err) {
      console.log(err);
      //alert should be there
    }
  };

  const link = async provider => {
    try {
      await auth.currentUser.linkWithPopup(provider);
      //alert with link
      updateIsConnected(provider.providerId, true);
      console.log('connected');
    } catch (err) {
      console.log(err);
      //alert
    }
  };

  const unlinkFacebook = () => {
    unlink('facebook.com');
  };
  const unlinkGoogle = () => {
    unlink('google.com');
  };
  const linkFacebook = () => {
    link(new firebase.auth.FacebookAuthProvider());
  };
  const linkGoogle = () => {
    link(new firebase.auth.GoogleAuthProvider());
  };
  return (
    <div>
      {isConnected['facebook.com'] && (
        <Tag color="green" closable onClose={unlinkFacebook}>
          <Icon as={FaFacebookMessenger} size="1em" /> Connected
        </Tag>
      )}
      {isConnected['google.com'] && (
        <Tag color="orange" closable onClose={unlinkGoogle}>
          <Icon as={FcGoogle} size="1em" /> Connected
        </Tag>
      )}

      <div className="mt-2">
        {!isConnected['facebook.com'] && (
          <Button
            block
            appearance="primary"
            color="green"
            onClick={linkFacebook}
          >
            <Icon as={FaFacebookMessenger} /> Link to facebook
          </Button>
        )}
      </div>
      <div className="mt-2">
        {!isConnected['google.com'] && (
          <Button
            block
            appearance="primary"
            color="orange"
            onClick={linkGoogle}
          >
            <Icon as={FcGoogle} /> Link to Google
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProviderBlock;
