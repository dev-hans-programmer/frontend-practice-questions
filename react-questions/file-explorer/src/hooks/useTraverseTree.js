function useTraverseTree() {
   function insertNode(tree, folderId, item, isFolder) {
      if (tree.id === folderId && isFolder) {
         tree.items.unshift({
            id: crypto.randomUUID().toString(),
            name: item,
            isFolder: true,
            items: [],
         });
      }
      return tree;
   }

   return { insertNode };
}
export default useTraverseTree;
