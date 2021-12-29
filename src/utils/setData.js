import { doc, setDoc, addDoc, collection, deleteDoc } from "firebase/firestore";
import { db } from "@/main";

// export async function setData(path, pathSegments, data) {
//   const isTrue = await setDoc(doc(db, path, pathSegments), data)
//     .then(() => {
//       return "success";
//     })
//     .catch(() => {
//       return "error";
//     });
//   return '';
// }

export async function setData(path, pathSegments, data) {
  try {
    await setDoc(doc(db, path, pathSegments), data);
    return "success";
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
}

export async function addData(path, data) {
  try {
    const docRef = await addDoc(collection(db, path), data);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
}

export async function deleteDocument(path, pathSegments) {
  try {
    await deleteDoc(doc(db, path, pathSegments));
    return "success";
  } catch (e) {
    console.error("Error deleting document ", e);
    return "error";
  }
}
