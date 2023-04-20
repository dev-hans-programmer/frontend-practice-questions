import { useState } from 'react';
import './styles.css';

function Folder({ explorerData, onAddFolder }) {
   const [expand, setExpand] = useState(false);
   const [showInput, setShowInput] = useState({
      visible: false,
      isFolder: false,
   });

   function handleShowInput(isFolder) {
      setExpand(true);
      setShowInput({
         visible: true,
         isFolder,
      });
   }

   function handleAddFolder(e) {
      if (e.keyCode === 13 && e.target.value) {
         onAddFolder(explorerData.id, e.target.value, showInput.isFolder);
         setShowInput((prev) => ({ ...prev, visible: false }));
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
                  <Folder key={exp.id} explorerData={exp} />
               ))}
            </div>
         </div>
      );
   }

   return (
      <div className='file'>
         <span>📄 {explorerData.name}</span>
      </div>
   );
}

export default Folder;
