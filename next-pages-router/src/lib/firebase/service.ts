import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import db from "./init";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { NextApiResponse } from "next";

async function retrieveData(collectionName: string) {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error retrieving products:", error);
    return [];
  }
}

async function retrieveDataById(collectionName: string, id: string) {
  try {
    const querySnapshot = await getDoc(doc(db, collectionName, id));

    return querySnapshot.data();
  } catch (error) {
    console.error("Error retrieving product:", error);
    return {};
  }
}

type UserData = {
  name: string;
  email: string;
  password: string;
};

async function signUp(
  userData: UserData,
  callback: ({ message, status }: { message: string; status: number }) => void,
) {
  const q = query(
    collection(db, "users"),
    where("email", "==", userData.email),
  );

  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    return callback({ message: "Email Already Exists", status: 400 });
  }

  await addDoc(collection(db, "users"), {
    name: userData.name,
    email: userData.email,
    password: await bcrypt.hash(userData.password, 10),
  });

  return callback({ message: "Register Successfully", status: 200 });
}

export { retrieveData, retrieveDataById, signUp };
