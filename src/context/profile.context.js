import { auth, database } from '../misc/firebase';
import React, { createContext, useContext, useEffect, useState } from 'react';

const ProfileContext = createContext();

export const ProfileProvider = ( {children}) => {
    const [isLoading, setIsLoading] = useState(true);

    const [profile, setProfile] = useState(null);

    useEffect(
        () => {

            let userRef;

          const authUnSub =  auth.onAuthStateChanged(authObj => {
                if(authObj){


                    userRef = database.ref(`/profiles/${authObj.uid}`);

                    userRef.on('value', snap => {
                     
                        const {name, createdAt, avatar} = snap.val();

                        const data = {
                            name,
                            avatar,
                            createdAt,
                            uid: authObj.uid,
                            email: authObj.email
                           }
        
                            setProfile(data);
                            setIsLoading(false);


                    }
                    )
                   

                }
                else{

                    if(userRef){
                        userRef.off()
                    }
                        setProfile(null);
                        setIsLoading(false);
                }
            });

            return () =>{  
                authUnSub();
               
                if(userRef){
                    userRef.off();
                }
            
            }
        },[]);

    return (
           <ProfileContext.Provider value={{isLoading, profile}}> 
            {children}
            </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);