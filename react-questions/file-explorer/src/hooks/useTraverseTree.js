function useTraverseTree() {
   function insertNode(tree, folderId, item, isFolder) {
      if (tree.id === folderId && tree.isFolder) {
         tree.items.unshift({
            id: crypto.randomUUID().toString(),
            name: item,
            isFolder,
            items: [],
         });
         return tree;
      }
      let latestNode = tree.items.map((obj) =>
         insertNode(obj, folderId, item, isFolder)
      );
      return { ...tree, items: latestNode };
   }

   // optimized insertNode Method using dynamic programming
   function insertNodeOptimized(tree, folderId, item, isFolder, memo = {}) {
      const memoKey = `${tree.id}-${folderId}`;
      if (memo[memoKey]) {
         return memo[memoKey];
      }

      if (tree.id === folderId && tree.isFolder) {
         const newNode = {
            id: crypto.randomUUID().toString(),
            name: item,
            isFolder,
            items: [],
         };
         tree.items.unshift(newNode);
         memo[memoKey] = tree;
         return tree;
      }

      tree.items.forEach((obj) =>
         insertNodeOptimized(obj, folderId, item, isFolder, memo)
      );

      memo[memoKey] = tree;
      return tree;
   }

   function deleteNode(tree, nodeId) {
      if (tree.id === nodeId) {
         return {}; // Return an empty object to effectively delete the node
      }

      if (tree.items && tree.items.length > 0) {
         const updatedItems = tree.items.map((item) =>
            deleteNode(item, nodeId)
         );
         return { ...tree, items: updatedItems };
      }

      return tree;
   }

   function deleteNodeOptimized(tree, nodeId, memo = {}) {
      if (tree.id === nodeId) {
         return {};
      }

      const memoKey = `${tree.id}-${nodeId}`;
      if (memo[memoKey]) {
         return memo[memoKey];
      }

      let updatedItems;
      if (tree.items && tree.items.length > 0) {
         updatedItems = tree.items.map((item) =>
            deleteNode(item, nodeId, memo)
         );
      }

      const updatedTree = { ...tree, items: updatedItems || tree.items };
      memo[memoKey] = updatedTree;
      return updatedTree;
   }

   function updateNode(tree, nodeId, newName) {
      if (tree.id === nodeId) {
         return { ...tree, name: newName };
      }

      if (tree.items && tree.items.length > 0) {
         const updatedItems = tree.items.map((item) =>
            updateNode(item, nodeId, newName)
         );
         return { ...tree, items: updatedItems };
      }

      return tree;
   }

   return {
      insertNode,
      insertNodeOptimized,
      deleteNode,
      deleteNodeOptimized,
      updateNode,
   };
}
export default useTraverseTree;
