import React, { useState } from 'react';
import { Block, Device, BlockType } from '../types';
import CanvasBlock from './CanvasBlock';

interface CanvasProps {
  blocks: Block[];
  onDrop: (item: { type: BlockType }, index: number) => void;
  moveBlock: (dragIndex: number, hoverIndex: number) => void;
  deleteBlock: (id: number) => void;
  duplicateBlock: (id: number, index: number) => void;
  previewDevice: Device;
}

const deviceWidths: Record<Device, string> = {
  mobile: 'w-[375px]',
  tablet: 'w-[768px]',
  desktop: 'w-full',
};

const Canvas: React.FC<CanvasProps> = ({ blocks, onDrop, moveBlock, deleteBlock, duplicateBlock, previewDevice }) => {
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    setDragOverIndex(null);
    const data = e.dataTransfer.getData('application/json');
    if (data) {
      const item = JSON.parse(data);
      if (item.type) { // New block from palette
        onDrop(item, index);
      } else if (item.index !== undefined) { // Reordering existing block
        moveBlock(item.index, index);
      }
    }
  };

  const renderDropZone = (index: number) => (
    <div
      onDragOver={(e) => handleDragOver(e, index)}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleDrop(e, index)}
      className={`relative transition-all duration-200 ${
        dragOverIndex === index ? 'py-16' : 'py-2'
      }`}
    >
      {dragOverIndex === index && (
        <div className="absolute inset-0 bg-indigo-100 border-2 border-dashed border-indigo-400 rounded-lg flex items-center justify-center">
          <span className="text-indigo-600 font-semibold">Drop here</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex-1 bg-slate-200 overflow-auto p-4 md:p-8">
      <div 
        className={`mx-auto bg-white shadow-2xl transition-all duration-300 ease-in-out ${deviceWidths[previewDevice]}`}
        style={{ transformOrigin: 'top center' }}
      >
        {blocks.length === 0 ? (
          <div 
            className="flex items-center justify-center h-96 border-4 border-dashed border-slate-300 rounded-lg"
            onDragOver={(e) => handleDragOver(e, 0)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 0)}
          >
             <div className="text-center text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <p className="mt-2 font-semibold">Drag a block here to start</p>
             </div>
             {dragOverIndex === 0 && (
                <div className="absolute inset-0 bg-indigo-100 border-2 border-dashed border-indigo-400 rounded-lg flex items-center justify-center">
                    <span className="text-indigo-600 font-semibold">Drop here</span>
                </div>
            )}
          </div>
        ) : (
          <div>
            {renderDropZone(0)}
            {blocks.map((block, index) => (
              <div key={block.id}>
                <CanvasBlock
                  id={block.id}
                  index={index}
                  moveBlock={moveBlock}
                  onDelete={() => deleteBlock(block.id)}
                  onDuplicate={() => duplicateBlock(block.id, index)}
                >
                  <block.component {...block.props} />
                </CanvasBlock>
                {renderDropZone(index + 1)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Canvas;