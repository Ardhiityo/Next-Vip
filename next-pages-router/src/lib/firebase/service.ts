import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import db from "./init";

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

export {
    retrieveData,
    retrieveDataById
}
