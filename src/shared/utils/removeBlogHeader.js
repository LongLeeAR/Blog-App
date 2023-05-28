export const separateTheBlogHeader = (blog) => {
  if (!blog) {
    return {};
  }
  
  const updatedBlocks = [...blog.blocks];
  const headerBlock = updatedBlocks.shift();

  return {
    headerBlock,
    blog: {
      ...blog,
      blocks: updatedBlocks
    }
  }
}