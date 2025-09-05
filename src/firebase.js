import { initializeApp } from "firebase/app"; 
import { addDoc,collection, getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {toast} from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyA0-pKxNG02WRBdiyCLrflsNF2NvT4cDWg",
  authDomain: "netflix-clone-a88d7.firebaseapp.com",
  projectId: "netflix-clone-a88d7",
  storageBucket: "netflix-clone-a88d7.appspot.com",
  messagingSenderId: "9215153121",
  appId: "1:9215153121:web:4e4f243e7bf9cfcaa538a0",
  measurementId: "G-6YSVRNE704"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const signup = async(name,email,password)=>{
  try{
    const res=await createUserWithEmailAndPassword(auth,email,password);
    const user=res.user;
    await addDoc(collection(db,"user"),{
      uid: user.uid,
      name,
      authProvider:"local",
      email,

    });
  }catch(error){
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));

  }

}
const login = async (email,password)=>{
  try{
    await signInWithEmailAndPassword(auth,email,password);
  
  } catch(error){
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));

  }

}
const logout = ()=>{
  signOut(auth);
}

export { app,db, auth,login,signup,logout };
