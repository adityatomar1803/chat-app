import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, database } from '../misc/firebase';

const ProfileContext = createContext();
// ProfileContext.displayName = 'display';

export const ProfileProvider = ({ children }) => {
  console.log('inside profile provider');
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let useRef;
    console.log('inside useEffect');
    const onAuthUnsub = auth.onAuthStateChanged(authObj => {
      if (authObj) {
        useRef = database.ref(`/profiles/${authObj.uid}`);
        useRef.on('value', snap => {
          console.log('snap:', snap);

          const { name, createAt, avatar } = snap.val();

          // console.log(err);

          const data = {
            name,
            createAt,
            avatar,
            uid: authObj.uid,
            email: authObj.email,
          };
          setProfile(data);
          setIsLoading(false);
        });
      } else {
        if (useRef) {
          useRef.off();
        }
        setProfile(null);
        setIsLoading(false);
      }
    });
    return () => {
      onAuthUnsub();
      if (useRef) {
        useRef.off();
      }
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ isLoading, profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
