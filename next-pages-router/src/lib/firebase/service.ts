import { collection, getDocs } from "firebase/firestore";
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

export {
    retrieveData
}
