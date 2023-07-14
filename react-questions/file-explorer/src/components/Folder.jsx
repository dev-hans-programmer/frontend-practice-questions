import { useRef, useState } from 'react';
import './styles.css';

function Folder({ explorerData, onInsertNode, onDeleteNode, onUpdateNode }) {
   const [expand, setExpand] = useState(false);
   const [showInput, setShowInput] = useState({
      visible: false,
      isFolder: false,
      isUpdate: false,
   });

   const [textVal, setTextVal] = useState('');

   const inputRef = useRef();

   function handleShowInput(isFolder, isUpdate = false) {
      setExpand(true);

      setTextVal(explorerData.name);

      setShowInput({
         visible: true,
         isFolder,
         isUpdate,
      });
   }

   function handleAddFolder(e) {
      if (e.keyCode === 13 && textVal) {
         if (showInput.isUpdate) {
            onUpdateNode(explorerData.id, textVal);
            setTextVal('');
            setShowInput((prev) => ({
               ...prev,
               visible: false,
               isUpdate: false,
            }));
         } else {
            onInsertNode(explorerData.id, e.target.value, showInput.isFolder);
            setShowInput((prev) => ({ ...prev, visible: false }));
         }
      }
   }

   if (explorerData.isFolder) {
      return (
         <div className='folder-container' style={{ cursor: 'pointer' }}>
            <div className='folder'>
               <span onClick={() => setExpand((prev) => !prev)}>
                  📁{explorerData.name}
               </span>

               <div className='buttons'>
                  <button onClick={() => handleShowInput(true)}>
                     Folder +
                  </button>
                  <button onClick={() => handleShowInput(false)}>File +</button>
                  <button onClick={() => onDeleteNode(explorerData.id)}>
                     Del
                  </button>
                  <button onClick={() => handleShowInput(false, true)}>
                     Edit
                  </button>
               </div>
            </div>
            <div
               style={{ display: expand ? 'block' : 'none', paddingLeft: 10 }}
            >
               {/* show input */}
               {showInput.visible && (
                  <div className='input-container'>
                     {showInput.isFolder ? '📁' : '📄'}
                     <input
                        value={textVal}
                        onChange={(e) => setTextVal(e.target.value)}
                        style={{ marginLeft: 4 }}
                        type='text'
                        autoFocus
                        onKeyDown={handleAddFolder}
                        onBlur={() =>
                           setShowInput((prev) => ({
                              ...showInput,
                              visible: false,
                           }))
                        }
                     />
                  </div>
               )}
               {explorerData.items.map((exp) => (
                  <Folder
                     onInsertNode={onInsertNode}
                     key={exp.id}
                     explorerData={exp}
                     onDeleteNode={onDeleteNode}
                     onUpdateNode={onUpdateNode}
                  />
               ))}
            </div>
         </div>
      );
   }

   return (
      <div className='file'>
         {explorerData.name && (
            <>
               <span>📄 {explorerData.name}</span>
               <div className='buttons'>
                  <button onClick={() => onDeleteNode(explorerData.id)}>
                     Del
                  </button>
                  <button onClick={() => handleShowInput(false, true)}>
                     Edit
                  </button>
               </div>
            </>
         )}
      </div>
   );
}

export default Folder;
