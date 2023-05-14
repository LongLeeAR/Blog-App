export const separateTheBlogHeader = (blog) => {
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