import React, { useState } from 'react';
import { Block, BlockType, Device } from './types';
import BlockPalette from './components/BlockPalette';
import Canvas from './components/Canvas';
import DeviceToolbar from './components/DeviceToolbar';
import { GenerateWithAIModal } from './components/GenerateWithAIModal';
import { AVAILABLE_BLOCKS } from './constants';
import { LogoIcon } from './components/icons/LogoIcon';

const App: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [previewDevice, setPreviewDevice] = useState<Device>('desktop');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const getBlockConfig = (type: BlockType) => {
    for (const category of AVAILABLE_BLOCKS) {
      const block = category.blocks.find(b => b.type === type);
      if (block) return block;
    }
    return null;
  };

  const addBlock = (item: { type: BlockType }, index: number) => {
    const blockConfig = getBlockConfig(item.type);
    if (!blockConfig) return;

    const newBlock: Block = {
      id: new Date().getTime(),
      type: item.type,
      component: blockConfig.component,
      props: blockConfig.defaultProps,
    };

    const newBlocks = [...blocks];
    newBlocks.splice(index, 0, newBlock);
    setBlocks(newBlocks);
  };

  const moveBlock = (dragIndex: number, hoverIndex: number) => {
    const draggedBlock = blocks[dragIndex];
    const newBlocks = [...blocks];
    newBlocks.splice(dragIndex, 1);
    newBlocks.splice(hoverIndex, 0, draggedBlock);
    setBlocks(newBlocks);
  };

  const deleteBlock = (id: number) => {
    setBlocks(blocks.filter(block => block.id !== id));
  };
  
  const duplicateBlock = (id: number, index: number) => {
    const blockToDuplicate = blocks.find(block => block.id === id);
    if (!blockToDuplicate) return;

    const newBlock: Block = {
      ...blockToDuplicate,
      id: new Date().getTime(),
    };

    const newBlocks = [...blocks];
    newBlocks.splice(index + 1, 0, newBlock);
    setBlocks(newBlocks);
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      <BlockPalette />
      <main className="flex-1 flex flex-col">
        <header className="bg-white flex-shrink-0 border-b border-slate-200 shadow-sm z-20">
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center space-x-2">
              <LogoIcon />
              <h1 className="text-xl font-bold text-slate-800">AI Page Builder</h1>
            </div>
            <div className="flex-1 flex justify-center">
              <DeviceToolbar currentDevice={previewDevice} onDeviceChange={setPreviewDevice} />
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setIsAiModalOpen(true)}
                className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.75 16.5a2.25 2.25 0 01-2.25-2.25V12a.75.75 0 00-1.5 0v2.25C6 15.664 7.336 17 9 17h6a.75.75 0 000-1.5H9.75z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M11.03 8.53a.75.75 0 010-1.06l3-3a.75.75 0 011.06 1.06l-3 3a.75.75 0 01-1.06 0z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M11.03 8.53l.72.72c.145.145.354.22.565.22h.01a.75.75 0 00.53-.22l2-2a.75.75 0 10-1.06-1.06l-1.47 1.47-1.47-1.47a.75.75 0 10-1.06 1.06l2 2a.75.75 0 00.53.22z" clipRule="evenodd" />
                </svg>
                Generate with AI
              </button>
            </div>
          </div>
        </header>
        <Canvas 
          blocks={blocks} 
          onDrop={addBlock} 
          moveBlock={moveBlock}
          deleteBlock={deleteBlock}
          duplicateBlock={duplicateBlock}
          previewDevice={previewDevice} 
        />
      </main>
      {isAiModalOpen && <GenerateWithAIModal onClose={() => setIsAiModalOpen(false)} setBlocks={setBlocks} />}
    </div>
  );
};

export default App;
