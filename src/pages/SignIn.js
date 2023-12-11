import React from 'react'
import firebase from "firebase/app"
import { Container, Row, Grid, Col, Panel, Button, Icon, Alert } from 'rsuite'
import { auth, database } from '../misc/firebase'

const SignIn = () => {
const signInWithProvider = async (Provider) => {
   try{
    const {additionalUserInfo, user} = await  auth.signInWithPopup(Provider)

    if(additionalUserInfo.isNewUser){
       await database.ref(`/profiles/${user.uid}`).set({
            name: user.displayName,
            createdAt: firebase.database.ServerValue.TIMESTAMP ,
        });

    }
    Alert.success('Signed In', 4000)
   }
   catch(err){
    Alert.error(err.message, 4000)
   }
  
  
}

    const OnFacebookSignIn = () => {
        signInWithProvider( new firebase.auth.FacebookAuthProvider())
    }
    const OnGoogleSignIn = () => {
        signInWithProvider(new firebase.auth.GoogleAuthProvider())
    }
  return (
   <Container>
    <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
                <div className="text-center">
                    <h2>Welcome to Chat</h2>
                    <p>
                        Progressive chat platform for neophytes
                    </p>
                </div>
                <div className="mt-3">
                    <Button block color="blue" onClick={OnFacebookSignIn}>
                       <Icon icon="facebook" /> Continue with Facebook
                    </Button>
                    <Button block color="green" onClick={OnGoogleSignIn}>
                       <Icon icon="google" /> Continue with Google
                    </Button>
                </div>
            </Panel>
          </Col>
        </Row>
    </Grid>
   </Container>
  )
}

export default SignIn
