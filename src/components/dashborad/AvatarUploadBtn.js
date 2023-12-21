import React, { useState, useRef} from 'react'

import { Alert, Button, Modal } from 'rsuite';
import { useModalState} from "../../misc/custom-hooks"
import AvatarEditor from 'react-avatar-editor'
import { database, storage} from '../../misc/firebase';
import { useProfile } from "../../context/profile.context"
import ProfileAvatar from './ProfileAvatar';



 

const fileInputTypes = ".png, .jpeg, .jpg "

const acceptedFilesTypes = ['image/png', 'image/jpeg', 'image/jpg'];

const isValidFile = (file) => acceptedFilesTypes.includes(file.type);

const getBlob = canvas => {
  return new Promise((resolve, reject) => {

    canvas.toBlob(blob => {
      if(blob){
        resolve(blob);
      }
      else{
        reject(new Error('File process error'))
      }
    })
  })
};

const AvatarUploadBtn = () => {

  
    
    const { isOpen, close, open } = useModalState();
    const { profile } = useProfile()
    const [isLoading, setIsLoading] = useState(false);
    const [Img, setImg] = useState(null);

    const avatarEditorRef = useRef();


    const onFileInputChange = (ev) => {

       const currFiles = ev.target.files;

       if(currFiles.length === 1){

         const file = currFiles[0];

         if( isValidFile(file) ){
            

                 setImg(file);

           open();
         }
         else{
          Alert.warning(`You selected wrong file type ${file.type}`,4000)
         }


       }
    }


   const onUploadClick = async () => {
      

    const canvas = avatarEditorRef.current.getImageScaledToCanvas();
    setIsLoading(true);

    try {
      const blob = await getBlob(canvas);
      const avatarFileRef = storage.ref(`/profile/${profile.uid}`).child('avatar');
      const uploadAvatarResult = await avatarFileRef.put( blob, {
        cacheControl: `public, max-age=${3600 * 24 * 3}`
      } );
      const downloadUrl = await uploadAvatarResult.ref.getDownloadURL()
      const userAvatarRef = database.ref(`/profiles/${profile.uid}`).child('avatar');

      await userAvatarRef.set(downloadUrl);
      Alert.info('Avatar has been Uploaded', 4000);
      setIsLoading(false);

    } catch (err) {
      setIsLoading(false);
      Alert.error(err.message, 4000);
    }
   }

  return (
    <div className="mt-3 text-center ">
   
      <ProfileAvatar className="width-200 height-200" src={profile.avatar} name={profile.name} />
   
         <div>

         <label htmlFor="avatar-upload"
         className="d-block cursor-pointer padded">

            Select new Avatar
            <input id="avatar-upload" type="file" className="d-none" accept={fileInputTypes} 
            onChange={onFileInputChange}/>
         </label>

         <Modal show={isOpen} onHide={close}>

          <Modal.Header>
            <Modal.Title>
                Adjust and Upload new avatar
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center align-item-center h-100 ">
            {Img && 
            <AvatarEditor 
            ref={avatarEditorRef}
            image={Img}
            width={200}
            height={200}
            border={10}
            borderRadius={100}
            
            rotate={0}
          />
            }
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button block appearance="ghost" onClick={onUploadClick} disabled={isLoading}>
                Upload new avatar
            </Button>
          </Modal.Footer>
         </Modal>


         </div>



    </div>
  );
};

export default AvatarUploadBtn;