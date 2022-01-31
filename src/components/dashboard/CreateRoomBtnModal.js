import { Icon } from '@rsuite/icons';
import React, { useRef, useState, useCallback } from 'react';
import { Button, Form, Modal, Schema } from 'rsuite';
import FormControl from 'rsuite/esm/FormControl';
import FormControlLabel from 'rsuite/esm/FormControlLabel';
import FormGroup from 'rsuite/esm/FormGroup';
import { useModalState } from '../../misc/custom-hooks';
import firebase from 'firebase/app';
import { auth, database } from '../../misc/firebase';

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('chat name is required'),
  description: StringType().isRequired('description is required'),
});

const INITIAL_FORM = {
  name: '',
  description: '',
};

const CreateRoomBtnModal = () => {
  const { isOpen, open, close } = useModalState();
  const [formValue, setFormValue] = useState(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();

  const onFormChange = useCallback(value => {
    setFormValue(value);
  }, []);

  const onSubmit = async () => {
    if (!formRef.current.check()) {
      return;
    }
    setIsLoading(true);
    const newRoomData = {
      ...formValue,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      admins: {
        [auth.currentUser.uid]: true,
      },
    };
    try {
      await database.ref('rooms').push(newRoomData);
      setIsLoading(false);
      setFormValue(INITIAL_FORM);
      close();
      //alert info form has been created
    } catch (err) {
      setIsLoading(false);
      //alert popup message  error for 4 seconds
    }
  };

  return (
    <div className="mt-1">
      <Button onClick={open} block appearance="primary" color="green">
        <Icon />
        Create New Chat Room
      </Button>

      <Modal keyboard={false} open={isOpen} onClose={close}>
        <Modal.Header>
          <Modal.Title>New Chat Room</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* <Form> */}
          <Form
            fluid
            onChange={onFormChange}
            ref={formRef}
            model={model}
            formValue={formValue}
          >
            <Form.Group controlId="name">
              <Form.ControlLabel>Username</Form.ControlLabel>
              <Form.Control name="name" />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.ControlLabel>Textarea</Form.ControlLabel>
              <Form.Control
                // componentClass="textarea"
                rows={5}
                name="description"
                placeholder="enter the description..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            block
            appearance="primary"
            color="green"
            onClick={onSubmit}
            disabled={isLoading}
          >
            Create New Chat Room
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateRoomBtnModal;
