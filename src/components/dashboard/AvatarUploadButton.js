import React, { useState, useRef } from 'react';
import { Button, Modal } from 'rsuite';
import { useModalState } from '../../misc/custom-hooks';
import AvatarEditor from 'react-avatar-editor';
import { storage } from '../../misc/firebase';
import { useProfile } from '../../context/profile.context';
import ProfileAvatar from './ProfileAvatar';
// import { database } from 'firebase';
import { database } from '../../misc/firebase';
import { getUserUpdates } from '../../misc/helper';

const fileInputTypes = '.png, .jpeg, .jpg, .PNG, .JPEG, .JPG';
const acceptedFileTypes = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/PNG',
  'image/JPG',
  'image/JPEG',
];

const isValidFile = file => {
  // console.log(file.type);
  return acceptedFileTypes.includes(file.type);
};

const getBlob = canvas => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('file process error'));
      }
    });
  });
};

export const AvatarUploadButton = () => {
  const { isOpen, open, close } = useModalState();
  const { profile } = useProfile();
  const [img, setImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const avatarEditorRef = useRef();

  const onFileInputChange = ev => {
    const currFiles = ev.target.files;
    console.log('inside onFileInputChange');

    if (currFiles.length === 1) {
      console.log('inside currFile.length');
      const file = currFiles[0];
      //   console.log(isValidFile(file));

      if (isValidFile(file)) {
        setImg(file);
        console.log('inside isValid');
        open();
      } else {
        console.log('inside isInValid');
        // console.log(result);

        //invoke alert
      }
    }
  };

  const onUploadClick = async () => {
    try {
      const canvas = avatarEditorRef.current.getImage();
      setIsLoading(true);
      const blob = await getBlob(canvas);

      const avatarFileRef = storage
        .ref(`/profile/${profile.uid}`)
        .child('avatar');

      const uploadAvatarResult = await avatarFileRef.put(blob, {
        cacheControl: `public, max-age=${3600 * 24 * 3}`,
      });

      const downloadUrl = await uploadAvatarResult.ref.getDownloadURL();

      const updates = await getUserUpdates(
        profile.uid,
        'avatar',
        downloadUrl,
        database
      );

      await database.ref().update(updates);

      // const userAvatarRef = database
      //   .ref(`/profiles/${profile.uid}`)
      //   .child('avatar');

      // userAvatarRef.set(downloadUrl);
      setIsLoading(false);
      //alert about avatar upload
    } catch (err) {
      console.log(err);
      // alert about error message
      setIsLoading(false);
    }
  };
  return (
    <div className="mt-3 text-center">
      <ProfileAvatar
        src={profile.avatar}
        name={profile.name}
        // as="img"
        // className="w-100 h-100 img font-huge"
        style={{ height: '200px', width: '200px' }}
      />

      <div>
        <label
          htmlFor="avatar-upload"
          className="d-block cursor-pointer padded"
        >
          Select New Avatar
          <input
            id="avatar-upload"
            type="file"
            className="d-none"
            accept={fileInputTypes}
            onChange={onFileInputChange}
          />
        </label>

        <Modal open={isOpen} onClose={close}>
          <Modal.Header>
            <Modal.Title>Adjust and upload new avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center align-items-center h-100">
              {img && (
                <AvatarEditor
                  ref={avatarEditorRef}
                  image={img}
                  width={250}
                  height={250}
                  border={10}
                  //   color={[255, 255, 255, 0.6]} // RGBA
                  //   scale={1.2}
                  borderRadius={100}
                  rotate={0}
                />
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              appearance="ghost"
              block
              onClick={onUploadClick}
              disabled={isLoading}
            >
              Upload new Avatar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
