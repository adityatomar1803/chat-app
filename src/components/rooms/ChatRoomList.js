import React from 'react';
import { Nav } from 'rsuite';
import { RoomItem } from './RoomItem';

const ChatRoomList = ({ aboveElementHeight }) => {
  return (
    <Nav
      appearance="subtle"
      vertical
      reverse="true"
      className="overflow-y-axis-scroll custom-scroll"
      style={{
        height: `calc(100%-${aboveElementHeight}px)`,
      }}
    >
      <Nav.Item>
        <RoomItem />
      </Nav.Item>
    </Nav>
  );
};

export default ChatRoomList;
