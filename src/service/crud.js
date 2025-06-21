import { collection,doc,getDoc,setDoc,addDoc,getDocs,updateDoc,deleteDoc } from 'firebase/firestore';
import { db } from './config';

export const createData = async (data) => {
  try {
    const docRef = await addDoc(collection(db, 'snippets'), data);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const readData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'snippets'));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (e) {
    console.error('Error getting documents: ', e);
  }
};

export const updateData = async (docId, updatedData) => {
  try {
    const docRef = doc(db, 'snippets', docId);
    await updateDoc(docRef, updatedData);
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};
export const deleteData = async (docId) => {
  try {
    await deleteDoc(doc(db, 'snippets', docId));
    console.log('Document deleted');
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
};
export const getTagList = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'tagList'));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (e) {
    console.error('Error getting documents: ', e);
  }
};
export const addNewTag = async (id,tag) => {
  try {
     await setDoc(doc(db, "tagList", id), tag);
  } catch (e) {
    console.error('Error adding tag: ', e);
  }
};


export const readSingleData = async (docId) => {
  try {
    const docRef = doc(db, 'snippets',docId);
    const data = await getDoc(docRef);
    return data.data();
  } catch (e) {
    console.error('Error getting documents: ', e);
  }
};
