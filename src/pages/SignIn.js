import {
  Container,
  Grid,
  Row,
  Col,
  Panel,
  IconButton,
  Button,
  Notification,
} from 'rsuite';
import { auth, database } from '../misc/firebase';
import firebase from 'firebase/app';
import { Icon } from '@rsuite/icons';
// import { Admin, Email } from '@rsuite/icons/lib/icons';
import { FaFacebookMessenger } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const SignIn = () => {
  console.log('inside sign in');
  const notification = () => {
    return (
      <Notification type="success" duration={3000}>
        Signed In
      </Notification>
    );
  };
  const SignInWithProvider = async provider => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
      if (additionalUserInfo.isNewUser) {
        console.log('inside');
        await database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          createAt: firebase.database.ServerValue.TIMESTAMP,
        });
        console.log('outside');
      }
      {
        notification();
      }
    } catch (err) {
      notification();
    }
  };

  const onFacebookSignIn = () => {
    SignInWithProvider(new firebase.auth.FacebookAuthProvider());
  };

  const onGoogleSignIn = () => {
    SignInWithProvider(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2>Welcome to the Chat</h2>
                <p>Progressive Chat application only for neophytes</p>{' '}
              </div>

              <div className="mt-3">
                <Button appearance="primary" block onClick={onFacebookSignIn}>
                  <Icon as={FaFacebookMessenger} size="2em" />
                  {/* <IconButton icon="facebook" appearance="primary" />  */}
                  Continue with Facebook
                </Button>
                <Button
                  color="orange"
                  appearance="primary"
                  block
                  onClick={onGoogleSignIn}
                >
                  {/* <IconButton icon="google" appearance="primary" />  */}
                  <Icon as={FcGoogle} size="2em" />
                  Continue with Google
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default SignIn;
