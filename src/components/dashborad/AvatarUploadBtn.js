import React, { useState } from 'react'

import { Alert, Button, Modal } from 'rsuite';
import { useModalState } from "../../misc/custom-hooks"
import AvatarEditor from 'react-avatar-editor'

const fileInputTypes = ".png, .jpeg, .jpg "

const acceptedFilesTypes = ['image/png', 'image/jpeg', 'image/jpg'];

const isValidFile = (file) => acceptedFilesTypes.includes(file.type);

const AvatarUploadBtn = () => {

    
    const { isOpen, close, open } = useModalState();
    const [Img, setImg] = useState(null);


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
  return (
    <div className="mt-3 text-center">
         
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
            <Button block appearance="ghost">
                Upload new avatar
            </Button>
          </Modal.Footer>
         </Modal>


         </div>



    </div>
  );
};

export default AvatarUploadBtn;