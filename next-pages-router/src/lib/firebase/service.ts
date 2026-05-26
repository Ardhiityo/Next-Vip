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

type UserSignUp = {
  name: string;
  email: string;
  password: string;
};

type UserSignIn = {
  email: string;
  password: string;
};

async function signIn(
  userLogin: UserSignIn,
  callback: ({
    data,
    message,
    status,
  }: {
    data?: object;
    message: string;
    status: number;
  }) => void,
) {
  const q = query(
    collection(db, "users"),
    where("email", "==", userLogin.email),
  );

  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const user = snapshot.docs[0].data();

    const isPasswordValid = await bcrypt.compare(
      userLogin.password,
      user.password,
    );

    if (isPasswordValid) {
      return callback({
        data: user,
        message: "Sign In Successfully",
        status: 200,
      });
    }
  }

  return callback({
    message: "Email or Password is incorrect",
    status: 400,
  });
}

async function signUp(
  userRegister: UserSignUp,
  callback: ({ message, status }: { message: string; status: number }) => void,
) {
  const q = query(
    collection(db, "users"),
    where("email", "==", userRegister.email),
  );

  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    return callback({ message: "Email Already Exists", status: 400 });
  }

  await addDoc(collection(db, "users"), {
    name: userRegister.name,
    email: userRegister.email,
    password: await bcrypt.hash(userRegister.password, 10),
    role: "member",
  });

  return callback({ message: "Register Successfully", status: 200 });
}

export { retrieveData, retrieveDataById, signUp, signIn };
