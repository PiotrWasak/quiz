import { doc, setDoc, addDoc, collection, deleteDoc } from "firebase/firestore";
import { db } from "@/main";

export async function setData(path, pathSegments, data) {
  const isTrue = await setDoc(doc(db, path, pathSegments), data)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
  return isTrue;
}

export async function addData(path, data) {
  try {
    const docRef = await addDoc(collection(db, path), data);

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function deleteDocument(path, pathSegments){
  try {
    await deleteDoc(doc(db, path, pathSegments));
    console.log("Deleted document");
  } catch (e) {
    console.error("Error deleting document ", e);
  }
}