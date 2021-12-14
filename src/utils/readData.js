import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/main";

export default async function getData(path) {
  let dataArray = [];
  const querySnapshot = await getDocs(collection(db, path));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const data = {id: doc.id, data: doc.data()};
    dataArray.push(data);
  });
  return dataArray;
}