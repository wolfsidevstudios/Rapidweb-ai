
import React, { useRef } from 'react';

interface CanvasBlockProps {
  id: any;
  index: number;
  moveBlock: (dragIndex: number, hoverIndex: number) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  children: React.ReactNode;
}

const CanvasBlock: React.FC<CanvasBlockProps> = ({ id, index, moveBlock, onDelete, onDuplicate, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ id, index }));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      ref={ref}
      className="relative group border-2 border-transparent hover:border-indigo-500 hover:z-10 rounded-md transition-all duration-200"
    >
      <div 
        draggable
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        className="absolute top-2 right-full mr-2 flex flex-col items-center space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <button className="p-2 bg-indigo-600 text-white rounded-full shadow-lg cursor-grab active:cursor-grabbing hover:bg-indigo-700" title="Move Block">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <button onClick={onDuplicate} className="p-2 bg-white text-slate-600 rounded-full shadow-lg hover:bg-slate-100 hover:text-indigo-600" title="Duplicate Block">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
            <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h6a2 2 0 00-2-2H5z" />
          </svg>
        </button>
        <button onClick={onDelete} className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600" title="Delete Block">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};

export default CanvasBlock;
