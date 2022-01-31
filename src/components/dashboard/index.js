import React from 'react';
import { Button, Divider, Drawer } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import { database } from '../../misc/firebase';
import { getUserUpdates } from '../../misc/helper';
import EditableInput from '../EditableInput';
import { AvatarUploadButton } from './AvatarUploadButton';
import ProviderBlock from './ProviderBlock';

const Dashboard = ({ onSignOut }) => {
  const { profile } = useProfile();
  const onSave = async newData => {
    // console.log(newData);
    // const userNickNameRef = database
    //   .ref(`/profiles/${profile.uid}`)
    //   .child('name');
    try {
      // await userNickNameRef.set(newData);

      const updates = await getUserUpdates(
        profile.uid,
        'name',
        newData,
        database
      );
      console.log('updates', updates);
      await database.ref().update(updates);
    } catch (err) {
      console.log('error occured');
      //alert need to be shown
    }
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
        <ProviderBlock />
        <Divider />
        <EditableInput
          initialValue={profile.name}
          onSave={onSave}
          name="nickname"
          label={<h6 className="mb-2">NickName</h6>}
        />
        <AvatarUploadButton />
      </Drawer.Body>
    </>
  );
};

export default Dashboard;
