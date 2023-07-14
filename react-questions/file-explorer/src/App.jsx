import { useState } from 'react';
import './App.css';
import explorerTree from './data/nestedData';
import Folder from './components/Folder';
import useTraverseTree from './hooks/useTraverseTree';

function App() {
   const [data, setData] = useState(explorerTree);

   const {
      insertNode,
      insertNodeOptimized,
      deleteNode,
      deleteNodeOptimized,
      updateNode,
   } = useTraverseTree();

   function handleAddFolder(folderId, item, isFolder) {
      const updatedTree = insertNodeOptimized(data, folderId, item, isFolder);

      setData(updatedTree);
   }

   function handleDeleteNode(nodeId) {
      console.log('NODE ID', nodeId);
      const updatedTree = deleteNodeOptimized(data, nodeId);
      setData(updatedTree);
   }

   function handleUpdateNode(nodeId, newName) {
      const updatedTree = updateNode(data, nodeId, newName);

      setData(updatedTree);
   }

   return (
      <div className='App'>
         <Folder
            onInsertNode={handleAddFolder}
            explorerData={data}
            onDeleteNode={handleDeleteNode}
            onUpdateNode={handleUpdateNode}
         />
      </div>
   );
}

export default App;
