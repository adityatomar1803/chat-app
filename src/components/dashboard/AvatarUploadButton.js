import React, { useState } from 'react';
import { Button, Modal } from 'rsuite';
import { useModalState } from '../../misc/custom-hooks';
import AvatarEditor from 'react-avatar-editor';

export const AvatarUploadButton = () => {
  const fileInputTypes = '.png, .jpeg, .jpg, .PNG, .JPEG, .JPG';
  const { isOpen, open, close } = useModalState();
  const acceptedFileTypes = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/PNG',
    'image/JPG',
    'image/JPEG',
  ];

  const [img, setImg] = useState(null);
  const isValidFile = file => {
    // console.log(file.type);
    return acceptedFileTypes.includes(file.type);
  };
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
  return (
    <div className="mt-3 text-center">
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
            <Button appearance="ghost" block>
              Upload new Avatar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
