import React from 'react';
import { Link } from 'react-router-dom';
import { Loader, Nav } from 'rsuite';
import { useRooms } from '../../context/rooms.context';
import { RoomItem } from './RoomItem';
import { useLocation } from 'react-router-dom';

const ChatRoomList = ({ aboveElementHeight }) => {
  console.log('inside chat room list');
  const rooms = useRooms();
  const location = useLocation();
  console.log(rooms);
  return (
    <Nav
      appearance="subtle"
      vertical
      reverse="true"
      className="overflow-y-axis-scroll custom-scroll"
      style={{
        height: `calc(100%-${aboveElementHeight}px)`,
      }}
      activeKey={location.pathname}
    >
      {!rooms && (
        <Loader center vertical content="loading" speed="slow" size="md" />
      )}
      {rooms &&
        rooms.length > 0 &&
        rooms.map(room => (
          <Nav.Item
            key={room.id}
            as={Link}
            to={`/chat/${room.id}`}
            eventKey={`/chat/${room.id}`}
          >
            <RoomItem room={room} />
          </Nav.Item>
        ))}
    </Nav>
  );
};

export default ChatRoomList;
