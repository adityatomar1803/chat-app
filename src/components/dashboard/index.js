import React from 'react';
import { Button, Divider, Drawer } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import EditableInput from '../EditableInput';

const Dashboard = ({ onSignOut }) => {
  const { profile } = useProfile();
  const onSave = async newData => {
    console.log(newData);
  };
  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
        <Drawer.Actions>
          <Button block appearance="primary" color="red" onClick={onSignOut}>
            Sign Out
          </Button>
        </Drawer.Actions>
      </Drawer.Header>

      <Drawer.Body>
        <h3>Hey, {profile.name}</h3>
        <Divider />
        <EditableInput
          initialValue={profile.name}
          onSave={onSave}
          name="nickname"
          label={<h6 className="mb-2">NickName</h6>}
        />
      </Drawer.Body>
    </>
  );
};

export default Dashboard;
