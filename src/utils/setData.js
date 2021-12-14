import { doc, setDoc } from "firebase/firestore";
import { db } from "@/main";

export default async function setData(path, pathSegments, data) {
  const isTrue = await setDoc(doc(db, path, pathSegments), data)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
  return isTrue;
}
