import { collection, getDoc, getDocs, doc } from "firebase/firestore";
import db from "./init";

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
