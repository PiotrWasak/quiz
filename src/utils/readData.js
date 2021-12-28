import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@/main";

export async function getData(path) {
  let dataArray = [];
  const querySnapshot = await getDocs(collection(db, path));
  querySnapshot.forEach((doc) => {
    const data = { id: doc.id, data: doc.data() };
    dataArray.push(data);
  });
  return dataArray;
}

export async function getDocument(path, pathSegments) {
  const docRef = doc(db, path, pathSegments);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return "Error while getting data";
  }
}

export async function queryData(path, fieldPath, optStr, value){
  let dataArray = [];
  const q = query(collection(db, path), where(fieldPath, optStr, value));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    dataArray.push({ id: doc.id, data: doc.data() });
  });
  return dataArray;
}