import React, { memo } from 'react';
import { useParams } from 'react-router';
import { Button, Drawer } from 'rsuite';
import { useCurrentRoom } from '../../../context/current-room.context';
import { useModalState } from '../../../misc/custom-hooks';
import { database } from '../../../misc/firebase';
import EditableInput from '../../EditableInput';
import { useMediaQuery } from '../../../misc/custom-hooks';

const EditRoomBtnDrawer = () => {
  const { isOpen, open, close } = useModalState();
  const name = useCurrentRoom(v => v.name);
  const description = useCurrentRoom(v => v.description);
  const { chatId } = useParams();
  const isMobile = useMediaQuery('(max-width:992px)');

  const updateData = (key, value) => {
    database
      .ref(`rooms/${chatId}`)
      .child(key)
      .set(value)
      .then(() => {
        //alert for successful updation
        console.log('successful updation ');
      })
      .catch(err => {
        console.log('error occurance ');
      });
  };

  const onNameSave = newName => {
    updateData('name', newName);
  };
  const onDescriptionSave = newDescription => {
    updateData('description', newDescription);
  };
  return (
    <div>
      <Button appearance="primary" size="md" color="red" onClick={open}>
        A
      </Button>
      <Drawer full={isMobile} open={isOpen} onClose={close}>
        <Drawer.Header>
          <Drawer.Title>Edit Room</Drawer.Title>

          <Drawer.Actions>
            <Button onClick={close}>Cancel</Button>
            {/* </Button> */}
          </Drawer.Actions>
        </Drawer.Header>

        <Drawer.Body>
          <EditableInput
            initialValue={name}
            onSave={onNameSave}
            label={<h6 className="mb-2">Name</h6>}
            emptyMessage="Name can not be empty"
          />
          <EditableInput
            as="textarea"
            rows={5}
            initialValue={description}
            onSave={onDescriptionSave}
            emptyMessage="Description can not be empty"
            wrapperClassName="mt-3"
          />
        </Drawer.Body>
      </Drawer>
    </div>
  );
};

export default memo(EditRoomBtnDrawer);
