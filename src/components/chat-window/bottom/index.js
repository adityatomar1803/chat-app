import React, { useCallback, useState } from 'react';
import { Icon } from '@rsuite/icons';
import { RiSendPlaneFill } from 'react-icons/ri';
// import { useProfile } from '../../../context/profile.context  ';
import { useProfile } from '../../../context/profile.context';

import { Input, InputGroup } from 'rsuite';
import firebase from 'firebase/app';
import { useParams } from 'react-router';
import { database } from '../../../misc/firebase';

function assembleMessage(profile, chatId) {
  return {
    roomId: chatId,
    author: {
      name: profile.name,
      uid: profile.uid,
      createdAt: profile.createAt,
      ...(profile.avatar ? { avatar: profile.avatar } : {}),
    },
    createdAt: firebase.database.ServerValue.TIMESTAMP,
  };
}

const ChatBottom = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { chatId } = useParams();
  const { profile } = useProfile();
  const onInputChange = useCallback(value => {
    setInput(value);
  }, []);

  const onSendClick = async () => {
    if (input.trim() === '') {
      return;
    }

    const msgData = assembleMessage(profile, chatId);
    msgData.text = input;

    const updates = {};

    const messageId = database.ref('messages').push().key;
    updates[`/messages/${messageId}`] = msgData;
    updates[`/rooms/${chatId}/lastMessage`] = {
      ...msgData,
      msgId: messageId,
    };

    setIsLoading(true);

    try {
      console.log('inside try block of index/bottom');
      await database.ref().update(updates);
      setInput('');
      setIsLoading(false);
    } catch (err) {
      //alert error
      setIsLoading(false);
      console.log('error occured in index.js bottom msg send', err);
    }
  };
  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      onSendClick();
    }
  };

  return (
    <div>
      <InputGroup>
        <Input
          placeholder="write a new message here..."
          value={input}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
        />
        <InputGroup.Button
          appearance="primary"
          color="blue"
          onClick={onSendClick}
          disabled={isLoading}
        >
          <Icon as={RiSendPlaneFill} size="2em" />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
};

export default ChatBottom;
