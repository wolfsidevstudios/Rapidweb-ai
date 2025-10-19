
import React, { useState, useCallback } from 'react';
import { Block, Device, BlockType } from './types';
import { AVAILABLE_BLOCKS } from './constants';
import BlockPalette from './components/BlockPalette';
import Canvas from './components/Canvas';
import DeviceToolbar from './components/DeviceToolbar';
import { GenerateWithAIModal } from './components/GenerateWithAIModal';
import { LogoIcon } from './components/icons/LogoIcon';

export default function App() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [previewDevice, setPreviewDevice] = useState<Device>('desktop');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const handleDrop = useCallback((item: { type: BlockType }, index: number) => {
    const blockConfig = AVAILABLE_BLOCKS.flatMap(cat => cat.blocks).find(b => b.type === item.type);
    if (blockConfig) {
      const newBlock: Block = {
        id: new Date().getTime(),
        type: item.type,
        component: blockConfig.component,
      };
      const newBlocks = [...blocks];
      newBlocks.splice(index, 0, newBlock);
      setBlocks(newBlocks);
    }
  }, [blocks]);

  const moveBlock = useCallback((dragIndex: number, hoverIndex: number) => {
    const draggedBlock = blocks[dragIndex];
    const newBlocks = [...blocks];
    newBlocks.splice(dragIndex, 1);
    newBlocks.splice(hoverIndex, 0, draggedBlock);
    setBlocks(newBlocks);
  }, [blocks]);

  const deleteBlock = useCallback((id: number) => {
    setBlocks(prevBlocks => prevBlocks.filter(block => block.id !== id));
  }, []);
  
  const duplicateBlock = useCallback((id: number, index: number) => {
    const blockToDuplicate = blocks.find(block => block.id === id);
    if(blockToDuplicate) {
        const newBlock: Block = {
            ...blockToDuplicate,
            id: new Date().getTime(),
        };
        const newBlocks = [...blocks];
        newBlocks.splice(index + 1, 0, newBlock);
        setBlocks(newBlocks);
    }
  }, [blocks]);


  return (
    <div className="flex h-screen w-screen font-sans bg-slate-100 text-slate-800 overflow-hidden">
      <BlockPalette />
      <main className="flex-1 flex flex-col h-screen">
        <header className="flex-shrink-0 bg-white border-b border-slate-200 shadow-sm z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-2">
                <LogoIcon />
                <h1 className="text-xl font-bold text-slate-700">Builder</h1>
              </div>
              <DeviceToolbar currentDevice={previewDevice} onDeviceChange={setPreviewDevice} />
              <button
                onClick={() => setIsAiModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM2 10a8 8 0 1116 0 8 8 0 01-16 0z" />
                </svg>
                Generate with AI
              </button>
            </div>
          </div>
        </header>

        <Canvas 
          blocks={blocks} 
          onDrop={handleDrop} 
          moveBlock={moveBlock} 
          deleteBlock={deleteBlock}
          duplicateBlock={duplicateBlock}
          previewDevice={previewDevice} 
        />
      </main>
      {isAiModalOpen && <GenerateWithAIModal onClose={() => setIsAiModalOpen(false)} setBlocks={setBlocks} />}
    </div>
  );
}
