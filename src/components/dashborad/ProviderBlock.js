import React, { useState } from 'react'
import { auth } from '../../misc/firebase'
import firebase from 'firebase/app'
import { Alert, Button, Icon, Tag } from 'rsuite'

const ProviderBlock = () => {

const [isConnected, setIsConnected] = useState({
   'google.com': auth.currentUser.providerData.some(
    data => data.providerId === 'google.com'
   ),
   'facebook.com': auth.currentUser.providerData.some(
    data => data.providerId === 'facebook.com'
   ),
})

const updatedIsConnected = (providerId, value) =>{
  setIsConnected(
    p => {
        return {
           ...p,
           [providerId]: value,

        };
    }
  )
}

const unLink = async (providerId) => {

try {
    
   if(auth.currentUser.providerData.length === 1){
    throw new Error (`You can not disconnected from ${providerId}`)
   }
  await auth.currentUser.unlink(providerId);

  updatedIsConnected(providerId, false)
  Alert.info(`Disconnected from ${providerId}`,4000)

} catch (err) {
    Alert.error(err.message, 4000);
}

}

const unLinkFacebook = () => {
    unLink('facebook.com')
}
const unLinkGoogle = () => {
    unLink('google.com')
}

const link = async (provider) =>{

    try {
        await auth.currentUser.linkWithPopup(provider);
    Alert.info(`Linked to ${provider.providerId}`, 4000)
    updatedIsConnected(provider.providerId, true)
        
    } catch (err) {
        Alert.error(err.message, 4000)
    }
    

}
const linkFacebook = () => {
    link(new firebase.auth.FacebookAuthProvider())
}
const linkGoogle = () => {
    link(new firebase.auth.GoogleAuthProvider())
}

  return (
    <div>
        {isConnected['google.com'] && (
        <Tag color="green" closable  onClose={unLinkGoogle}>
        <Icon icon="google" />Connected
         </Tag>
        )}

        {isConnected['facebook.com'] &&
        (
            <Tag color="blue" closable onClose={unLinkFacebook}>
        <Icon icon="facebook" />Connected
        </Tag>

        )}
   
    
    <div className="mt-2">

        {!isConnected['google.com'] && 
            <Button block color="green" onClick={linkGoogle}>
            <Icon icon='google'/> Link to google

        </Button>
        }
        {!isConnected['facebook.com'] && 
            <Button block color="blue" onClick={linkFacebook}>
            <Icon icon='facebook'/> Link to facebook

        </Button>
        }
        

    </div>
    </div>
  )
}

export default ProviderBlock
