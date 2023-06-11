import { getDatabase } from "firebase/database";

export const callWithFirebaseDB = async (func) => {
  try {
    const database = getDatabase();
    const result = await func(database);
    return result;
  } catch (error) {
    throw error;
  }
}