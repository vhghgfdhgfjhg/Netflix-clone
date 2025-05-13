import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAnb1welFwk6cVS0FO8mP2rqe30kduKGis",
  authDomain: "netflix-clone-7ab58.firebaseapp.com",
  projectId: "netflix-clone-7ab58",
  storageBucket: "netflix-clone-7ab58.firebasestorage.app",
  messagingSenderId: "995284902816",
  appId: "1:995284902816:web:2fc85f47d642fd9ce93ac5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '))
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email,password);

  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '))
  }
};

const logout =()=>{
  signOut(auth);
}

export {auth,db,login,signup,logout}