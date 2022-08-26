import { initializeApp } from "firebase/app";
import
{
  getAuth, 
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB19wKI_ITQIvPXG40WA4bFdvJEypm_G7Y",
  authDomain: "clothing-store-db-ba8ae.firebaseapp.com",
  projectId: "clothing-store-db-ba8ae",
  storageBucket: "clothing-store-db-ba8ae.appspot.com",
  messagingSenderId: "928399577488",
  appId: "1:928399577488:web:e5a5f82d29255ffa1fe315"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const googleProvider  =  new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider);
export const signInWithGoogleRedirect = () =>  signInWithRedirect(auth,googleProvider);

export const db =getFirestore();

export const createUserDocumentFromAuth  = async(
  userAuth,
  additionalInformation={}
  ) =>{
  if(!userAuth) return;                        
  const userDocRef = doc(db,'users',userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  // create a document if the user does not exist else if  user already exist then return the userDocRef

  if(!userSnapshot.exists()){
    const {displayName,email} = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef,{
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    }
    catch(error){
      console.log('error creating a user', error.message);
    }
  }

  return userDocRef;
}


export const  createAuthUserWithEmailAndPassword = async (email,password) =>{
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth,email,password);                                                                            
}



export const signInAuthWithEmailAndPassword = async (email,password)=>{
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth,email,password);

}
