
import React from 'react';
import { AVAILABLE_BLOCKS } from '../constants';
import { BlockType } from '../types';

const DraggableBlock: React.FC<{ name: string, type: BlockType, icon: React.FC<{className?: string}> }> = ({ name, type, icon: Icon }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ type }));
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="flex flex-col items-center justify-center p-2 bg-white border border-slate-200 rounded-lg cursor-grab hover:bg-indigo-50 hover:border-indigo-300 hover:shadow-md transition-all duration-200 text-center"
    >
      <Icon className="h-8 w-8 mb-2 text-indigo-500" />
      <span className="text-xs font-semibold text-slate-600">{name}</span>
    </div>
  );
};

const BlockPalette: React.FC = () => {
  return (
    <aside className="w-72 bg-white flex-shrink-0 border-r border-slate-200 shadow-lg flex flex-col">
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-lg font-bold text-slate-700">Blocks</h2>
        <p className="text-sm text-slate-500">Drag & drop to build</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {AVAILABLE_BLOCKS.map((category) => (
          <div key={category.name}>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">{category.name}</h3>
            <div className="grid grid-cols-2 gap-3">
              {category.blocks.map((block) => (
                <DraggableBlock key={block.type} name={block.name} type={block.type} icon={block.icon} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default BlockPalette;
