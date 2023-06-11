import { child, get, ref, set } from "firebase/database";
import { getDownloadURL, getStorage, ref as storageRef, uploadString } from 'firebase/storage';
import { callWithFirebaseDB } from "shared/api";
import { BlogsRef } from "shared/constants";
import { formatText } from "shared/utils/formatText";

export const fetchBlogListService = async () => {
  try {
    return await callWithFirebaseDB(async (database) => {
      const blogsRef = ref(database, BlogsRef);
      const snapshot = await get(blogsRef);
      const data = snapshot.val();
      if (data) {
        return data;
      }
    })
  } catch (error) {
    return null;
  }
}

const formatImageBlocks = async (savedData, app) => {
  try {
    const storage = getStorage(app);

    const imagesRef = storageRef(storage, 'images');
    const imagesBlock = savedData.blocks.filter(block => block.type === 'simpleImage' && block?.data?.url?.startsWith('data:image/'));
    
    for (const imageBlock of imagesBlock) {
      const snapshot = await uploadString(storageRef(imagesRef, Date.now().toString()), imageBlock.data.url, 'data_url');
      const url = await getDownloadURL(storageRef(storage, snapshot.metadata.fullPath));
      imageBlock.data.url = url;
    }

    return Promise.resolve(imagesBlock.reduce((acc, block) => {
      return {
        ...acc,
        [block.id]: block
      }
    }, {}));
  } catch (error) {
    throw Promise.reject(error); 
  }
}

export const saveBlogService =  async (blog, app) => {
  try {
    const imageBlocksById = await formatImageBlocks(blog, app);
  
    blog.blocks = blog.blocks.map(block => {
      if (block?.data?.text) {
        block.data.text = formatText(block?.data?.text);
      }
      
      if (imageBlocksById[block.id]) {
        return imageBlocksById[block.id];
      }
      return block;
    })

    return await callWithFirebaseDB(async (database) => {
      await set(ref(database, BlogsRef + '/' + blog.id), blog);
      return blog;
    })
  } catch (error) {
    console.log('save blog counter error: ', error);
    return null;
  }
}

export const fetchBlogDetailService = async (blogId) => {
  return callWithFirebaseDB(async (database) => {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, `${BlogsRef}/${blogId}`));
    const data = snapshot.val();
    if (data) {
      return data;
    }
  })
}
