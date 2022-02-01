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
import { IoIosClose } from 'react-icons/io';
import { useHover, useMediaQuery } from '../../../misc/custom-hooks';
import ImgBtnModal from './ImgBtnModal';

const renderFileMessage = file => {
  if (file.contentType.includes('image')) {
    console.log('inside renderFileMessage');
    return (
      <div className="height-220">
        <ImgBtnModal src={file.url} filename={file.name} />
      </div>
    );
  }
  return <a href={file.url}>Download {file.name}</a>;
};

const MessageItem = ({
  message,
  handleAdmin,
  handleLike,
  file,
  handleDelete,
}) => {
  const { author, createdAt, text, likes, likesCount } = message;

  const [selfRef, isHovered] = useHover();
  const isMobile = useMediaQuery('(max-width:992px)');
  const isAdmin = useCurrentRoom(v => v.isAdmin);
  const admins = useCurrentRoom(v => v.admins);

  const isMsgAuthorAdmin = admins.includes(author.uid);
  const isAuthor = auth.currentUser.uid === author.uid;
  const canGrantAdmin = isAdmin && !isAuthor;
  const canShowIcons = isMobile || isHovered;
  const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid);
  return (
    <li
      className={`padded mb-1 cursor-pointer ${isHovered ? 'bg-black-02' : ''}`}
      ref={selfRef}
    >
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
          isVisible={canShowIcons}
          iconName={AiOutlineHeart}
          tooltip="like this message"
          onClick={() => {
            handleLike(message.id);
          }}
          badgeContent={likesCount}
        />

        {isAuthor && (
          <IconBtnControl
            isVisible={canShowIcons}
            iconName={IoIosClose}
            tooltip="delete this message"
            onClick={() => {
              handleDelete(message.id);
            }}
          />
        )}
      </div>

      <div>
        {text && <span className="word-break-all">{text}</span>}
        {file && renderFileMessage(file)}
      </div>
    </li>
  );
};

export default memo(MessageItem);
