import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

// Set a users displayName within the db.
export const setUserDisplayName = async (uid, displayName) => {
  try {
    const docRef = await setDoc(doc(db, "users", uid), {
      displayName: displayName,
    });

    return docRef;
  } catch (err) {
    console.log("Error setting displayName for user: " + uid, err);
  }
};
