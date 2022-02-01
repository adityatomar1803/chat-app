import { Icon } from '@rsuite/icons';
import React, { useState } from 'react';
import { GoFileSubmodule } from 'react-icons/go';
import { Button, InputGroup, Modal, Uploader } from 'rsuite';
import { useModalState } from '../../../misc/custom-hooks';
import { storage } from '../../../misc/firebase';
import { useParams } from 'react-router';

const MAX_FILE_SIZE = 1000 * 1024 * 5;

const AttachmentBtnModal = ({ afterUpload }) => {
  const { chatId } = useParams();
  const { isOpen, open, close } = useModalState();

  const [fileList, setFileList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const onChangehandler = fileArr => {
    const filtered = fileArr
      .filter(el => el.blobFile.size <= MAX_FILE_SIZE)
      .slice(0, 5);
    setFileList(filtered);
  };

  const onUpload = async () => {
    try {
      const uploadPromises = fileList.map(f => {
        return storage
          .ref(`/chat/${chatId}`)
          .child(Date.now() + f.name)
          .put(f.blobFile, {
            cacheControl: `public, max-age=${3600 * 24 * 3}`,
          });
      });
      const uploadSnapshots = await Promise.all(uploadPromises);
      const shapePromises = uploadSnapshots.map(async snap => {
        return {
          contentType: snap.metadata.contentType,
          name: snap.metadata.name,
          url: await snap.ref.getDownloadURL(),
        };
      });

      const files = await Promise.all(shapePromises);

      await afterUpload(files);
      setIsLoading(false);
      close();
    } catch (err) {
      setIsLoading(false);
      console.log('error uploading files', err);
    }
  };
  return (
    <>
      <InputGroup.Button onClick={open}>
        <Icon as={GoFileSubmodule} />
      </InputGroup.Button>
      <Modal open={isOpen} onClose={close}>
        <Modal.Header>
          <Modal.Title>Upload Files</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Uploader
            // value={value}
            autoUpload={false}
            fileList={fileList}
            action=""
            onChange={onChangehandler}
            // ref={uploaderRef}
            multiple
            listType="picture-text"
            className="w-100"
            disabled={isLoading}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button block disabled={isLoading} onClick={onUpload}>
            Send to Chat
          </Button>
          <div className="text-right mt-2">
            <small>***only files less than 5mb are allowed</small>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AttachmentBtnModal;
