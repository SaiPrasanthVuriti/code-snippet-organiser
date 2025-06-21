import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { auth, googleProvider} from "./config";

export const registerWithEmail = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const loginWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

export const passwordResetLink = (email) => sendPasswordResetEmail(auth,email); 

export const logout = () => signOut(auth);


