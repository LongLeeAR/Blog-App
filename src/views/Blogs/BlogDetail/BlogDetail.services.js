import { child, get, ref } from "firebase/database";
import { callWithFirebaseDB } from "shared/api";
import { BlogsRef } from "shared/constants";


export const fetchBlogDetailService = async (blogId) => {
  return callWithFirebaseDB(async (database) => {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, `${BlogsRef}/${blogId}`));
    const data = snapshot.val();
    // .then((snapshot) => {
    //   const data = snapshot.val();
    if (data) {
      return data;
    }
    // })
    // .catch(err => err)
  })
}


