import React, { createContext } from 'react';
import { database } from '../misc/firebase';
import { transformToArrWithId } from '../misc/helper';

const RoomsContext = createContext();

export const RoomsProvider = ({ children }) => {
  const [rooms, setRooms] = useState(null);
  useEffect(() => {
    const roomListRef = database.ref('rooms');
    roomListRef.on('value', () => {
      //   console.log('snap.val', snap.val());
      const data = transformToArrWithId(snap.val());
      setRooms(data);
    });

    return () => {
      roomListRef.off();
    };
  }, [third]);

  return (
    <RoomsContext.Provider value={rooms}>{children}</RoomsContext.Provider>
  );
};
