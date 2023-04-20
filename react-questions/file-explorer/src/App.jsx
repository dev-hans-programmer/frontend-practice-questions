import { useState } from 'react';
import './App.css';
import explorerTree from './data/nestedData';
import Folder from './components/Folder';
import useTraverseTree from './hooks/useTraverseTree';

function App() {
   const [data, setData] = useState(explorerTree);

   const { insertNode } = useTraverseTree();

   function handleAddFolder(folderId, item, isFolder) {
      const updatedTree = insertNode(data, folderId, item, isFolder);

      setData(updatedTree);
   }

   return (
      <div className='App'>
         <Folder onAddFolder={handleAddFolder} explorerData={data} />
      </div>
   );
}

export default App;
