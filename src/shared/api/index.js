import { getDatabase } from "firebase/database";

export const callWithFirebaseDB = (func) => {
  try {
    const database = getDatabase();
    const result = func(database);
    return result;
  } catch (error) {
    return error;
  }
}