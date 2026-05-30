import {
  collection,
  getDoc,
  getDocs,
  doc,
  where,
  query,
  addDoc,
} from "firebase/firestore";
import db from "./init";
import bcrypt from "bcrypt";

type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export async function retrieveData(collections: string): Promise<Product[]> {
  try {
    const querySnapshot = await getDocs(collection(db, collections));

    if (querySnapshot.empty) {
      return [];
    }

    return querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        title: doc.data().title as string,
        price: doc.data().price as number,
        description: doc.data().description as string,
        image: doc.data().image as string,
        category: doc.data().category as string,
        rating: {
          rate: doc.data().rating.rate as number,
          count: doc.data().rating.count as number,
        },
      };
    });
  } catch (error) {
    console.error("Error retrieving products:", error);
    return [];
  }
}

export async function retrieveDataById(
  collections: string,
  id: string,
): Promise<Product | null> {
  try {
    const docRef = doc(db, collections, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.log(
        `No document found with id: ${id} in collection: ${collections}`,
      );
      return null;
    }

    return {
      id: docSnap.id,
      title: docSnap.data().title as string,
      price: docSnap.data().price as number,
      description: docSnap.data().description as string,
      image: docSnap.data().image as string,
      category: docSnap.data().category as string,
      rating: {
        rate: docSnap.data().rating.rate as number,
        count: docSnap.data().rating.count as number,
      },
    } as Product;
  } catch (error) {
    console.error("Error retrieving product:", error);
    return null;
  }
}

type UserSignUp = {
  email: string;
  password: string;
  name: string;
};

export async function signUp(
  userSignUp: UserSignUp,
  callback: ({ status, message }: { status: number; message: string }) => void,
): Promise<void> {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", userSignUp.email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return callback({ status: 400, message: "Email already exists" });
    }

    await addDoc(usersRef, {
      email: userSignUp.email,
      name: userSignUp.name,
      password: await bcrypt.hash(userSignUp.password, 10),
    });

    return callback({ status: 200, message: "Signed up successfully" });
  } catch (error) {
    callback({ status: 500, message: "Internal Server Error" });
    console.error("Error signing up:", error);
  }
}
