import React, { useState, memo } from 'react';
import ProfileAvatar from '../../dashboard/ProfileAvatar';
import TimeAgo from 'timeago-react';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';
import { Link } from 'react-router-dom';
import PresenceDot from '../../PresenceDot';
import { Button } from 'rsuite';
import { useCurrentRoom } from '../../../context/current-room.context';
import { auth } from '../../../misc/firebase';
import IconBtnControl from './IconBtnControl';
import { AiOutlineHeart } from 'react-icons/ai';

const MessageItem = ({ message, handleAdmin, handleLike }) => {
  const { author, createdAt, text, likes, likesCount } = message;
  const isAdmin = useCurrentRoom(v => v.isAdmin);
  const admins = useCurrentRoom(v => v.admins);

  const isMsgAuthorAdmin = admins.includes(author.uid);
  const isAuthor = auth.currentUser.uid === author.uid;
  const canGrantAdmin = isAdmin && !isAuthor;
  const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid);
  return (
    <li className="padded mb-1">
      <div className="d-flex align-items-center font-bolder mb-1">
        <PresenceDot uid={author.uid} />
        <ProfileAvatar
          src={author.avatar}
          name={author.name}
          className="ml-1"
          size="xs"
        />
        {/* <span className="ml-2">{author.name}</span> */}
        <ProfileInfoBtnModal
          profile={author}
          // style={{hover: ''}}
          className="p-0 ml-1 text-black"
        >
          {canGrantAdmin && (
            <Button
              block
              onClick={() => handleAdmin(author.uid)}
              appearance="primary"
              color="blue"
            >
              {isMsgAuthorAdmin
                ? 'Remove admin permission'
                : 'Give admin permission'}
            </Button>
          )}
        </ProfileInfoBtnModal>
        <TimeAgo
          datetime={createdAt}
          className="font-normal text-black-45 ml-2"
        />

        <IconBtnControl
          {...(isLiked ? { appearance: 'primary', color: 'red' } : {})}
          isVisible
          iconName={AiOutlineHeart}
          tooltip="like this message"
          onClick={() => {
            handleLike(message.id);
          }}
          badgeContent={5}
        />
      </div>

      <div>
        <span className="word-break-all">{text}</span>
      </div>
    </li>
  );
};

export default memo(MessageItem);
