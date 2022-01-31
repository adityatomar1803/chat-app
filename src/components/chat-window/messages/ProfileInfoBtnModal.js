import React from 'react';
import { Button, Modal } from 'rsuite';
import { useModalState } from '../../../misc/custom-hooks';
import ProfileAvatar from '../../dashboard/ProfileAvatar';

const ProfileInfoBtnModal = ({ profile, children, ...btnProps }) => {
  const { isOpen, open, close } = useModalState();
  const shortName = profile.name.split(' ')[0];
  const { name, avatar, createdAt } = profile;
  const memberSince = new Date(createdAt).toLocaleDateString();

  return (
    <>
      <Button {...btnProps} onClick={open}>
        {shortName}
      </Button>
      <Modal open={isOpen} onClose={close}>
        <Modal.Header>
          <Modal.Title>{shortName} Profile</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center">
          <ProfileAvatar
            src={avatar}
            name={name}
            // className="width-200 height-200 img-fullsize font-huge"
            style={{ height: '150px', width: '150px' }}
            size="lg"
          />

          <h4 className="mt-2">{name}</h4>
          <p>Member since {memberSince}</p>
        </Modal.Body>

        <Modal.Footer>
          {children}
          <Button block onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileInfoBtnModal;
