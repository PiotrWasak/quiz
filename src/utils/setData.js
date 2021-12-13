import { doc, setDoc } from "firebase/firestore";
import { db } from "@/main";

export default async function setData(path) {
  await setDoc(doc(db, "cities", "LA"), {
    name: "Los Angeles",
    state: "CA",
    country: "USA"
  });
}