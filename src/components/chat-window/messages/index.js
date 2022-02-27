import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import { auth, database } from '../../../misc/firebase';
import { groupBy, transformToArrWithId } from '../../../misc/helper';
import MessageItem from './MessageItem';

const Messages = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState(null);

  const isChatEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;

  useEffect(() => {
    const messagesRef = database.ref('/messages');
    messagesRef
      .orderByChild('roomId')
      .equalTo(chatId)
      .on('value', snap => {
        const data = transformToArrWithId(snap.val());
        setMessages(data);
      });

    return () => {
      messagesRef.off('value');
    };
  }, [chatId]);

  const handleAdmin = useCallback(
    async uid => {
      const adminRef = database.ref(`/rooms/${chatId}/admins`);

      let alertMsg;

      await adminRef.transaction(admins => {
        if (admins) {
          if (admins[uid]) {
            admins[uid] = null;
            alertMsg = 'Admin permission removed';
          } else {
            admins[uid] = true;
            alertMsg = 'Admin permission granted';
          }
        }
        return admins;
      });

      console.log('alert message is:', alertMsg);
      //alert
    },
    [chatId]
  );

  const handleLike = useCallback(async msgId => {
    const { uid } = auth.currentUser;
    const messageRef = database.ref(`/messages/${msgId}`);

    let alertMsg;

    await messageRef.transaction(msg => {
      if (msg) {
        if (msg.likes && msg.likes[uid]) {
          msg.likeCount -= 1;
          msg.likes[uid] = null;
          alertMsg = 'like removed';
        } else {
          msg.likeCount += 1;
          if (!msg.likes) {
            msg.likes = {};
          }
          msg.likes[uid] = true;
          alertMsg = 'like added';
        }
      }
      return msg;
    });

    console.log('alert message is:', alertMsg);
  }, []);

  const handleDelete = useCallback(
    async (msgId, file) => {
      if (!window.confirm('delete this message')) {
        return;
      }
      const isLast = messages[messages.length - 1].id === msgId;

      const updates = {};
      updates[`/messages/${msgId}`] = null;

      if (isLast && messages.length > 1) {
        updates[`/rooms/${chatId}/lastMessage`] = {
          ...messages[messages.length - 2],
          msgId: messages[messages.length - 2].id,
        };
      }

      if (isLast && messages.length === 1) {
        updates[`/room/${chatId}/lastMessage`] = null;
      }

      try {
        await database.ref().update(updates);
        //message deleteed: alert
        console.log('msg dlted');
      } catch (err) {
        //message not deleteed: alert
        console.log('msg dlted error');
        return;
      }
      if (file) {
        try {
          const fileRef = await storage.refFromURL(file.url);
          await fileRef.delete();
        } catch (error) {
          console.log('error', error);
        }
      }
    },
    [chatId, messages]
  );

  const renderMessages = () => {
    const groups = groupBy(messages, item =>
      new Date(item.createdAt).toDateString()
    );

    const items = [];

    Object.keys(groups).forEach(date => {
      items.push(
        <li key={date} className="text-center mb-1 padded">
          {date}
        </li>
      );

      const msgs = groups[date].map(msg => (
        <MessageItem
          key={msg.id}
          message={msg}
          handleAdmin={handleAdmin}
          handleLike={handleLike}
          handleDelete={handleDelete}
        />
      ));
      items.push(...msgs);
      // items.concat(msgs);
    });
    return items;
  };

  return (
    <ul className="msg-list custom-scroll">
      {isChatEmpty && <li>No Messages Yet</li>}
      {canShowMessages && renderMessages()}
    </ul>
  );
};

export default Messages;
