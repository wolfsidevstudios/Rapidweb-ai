import React, { useState, useCallback } from 'react';
import { Block, Device, BlockType } from './types';
import { AVAILABLE_BLOCKS } from './constants';
import BlockPalette from './components/BlockPalette';
import Canvas from './components/Canvas';
import DeviceToolbar from './components/DeviceToolbar';
import { GenerateWithAIModal } from './components/GenerateWithAIModal';
import { LogoIcon } from './components/icons/LogoIcon';
import { useApiKey } from './context/ApiKeyContext';
import ApiKeyModal from './components/ApiKeyModal';
import { KeyIcon } from './components/icons/KeyIcon';

export default function App() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [previewDevice, setPreviewDevice] = useState<Device>('desktop');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const { apiKey } = useApiKey();

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

  const handleGenerateClick = () => {
    if (apiKey) {
      setIsAiModalOpen(true);
    } else {
      setIsApiKeyModalOpen(true);
    }
  };

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
              <div className="flex items-center gap-4">
                <DeviceToolbar currentDevice={previewDevice} onDeviceChange={setPreviewDevice} />
                <div className="h-8 border-l border-slate-200"></div>
                <button
                  onClick={() => setIsApiKeyModalOpen(true)}
                  className="p-2 text-slate-500 rounded-md hover:bg-slate-100 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  title="Set API Key"
                >
                  <KeyIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={handleGenerateClick}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  Generate with AI
                </button>
              </div>
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
      {isApiKeyModalOpen && <ApiKeyModal onClose={() => setIsApiKeyModalOpen(false)} />}
    </div>
  );
}
