import React from 'react';
import { Modal } from 'rsuite';
import { useModalState } from '../../../misc/custom-hooks';

const ImgBtnModal = ({ scr, fileName }) => {
  const { isOpen, open, close } = useModalState();
  console.log('inside imgbtnmodal');
  return (
    <>
      <input
        type="image"
        src={src}
        onClick={open}
        alt="file"
        className="mw-100 mh-100 w-auto"
      />
      <Modal open={isOpen} onClose={close}>
        <Modal.Header>
          <Modal.Title>{fileName}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <img src={src} height="100%" width="100%" alt="file" />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <a href={src} target="_blank" rel="noopener noreferrer"></a>
          View Original
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ImgBtnModal;
