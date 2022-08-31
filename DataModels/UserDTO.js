import { db } from "../firebase";
import { collection, doc, addDoc } from "firebase/firestore";

/** A class that represents the user stored in the database */
export default class User {
  constructor(name, address, phoneNumber) {
    this.name = name;
    this.address = address;
    this.phoneNumber = phoneNumber;
  }

  static createDBUser = async (name, address, phoneNumber) => {
    try {
      const ref = collection(db, "users").withConverter(userConverter);
      await addDoc(ref, new User(name, address, phoneNumber));
    } catch (excpt) {
      console.log("Error performing write: " + excpt);
    }
  };
}

const userConverter = {
  toFirestore: (user) => {
    return {
      name: user.name,
      address: user.address,
      phoneNumber: user.phoneNumber,
    };
  },

  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new User(data.name, data.address, data.phoneNumber);
  },
};
