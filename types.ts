
import React from 'react';

export type BlockType = 
  | 'Navbar' 
  | 'Hero' 
  | 'Features' 
  | 'CallToAction' 
  | 'Testimonials' 
  | 'Contact' 
  | 'Footer'
  | 'Gallery'
  | 'Pricing'
  | 'Team'
  | 'Stats'
  | 'LogoCloud';

export interface Block {
  id: number;
  type: BlockType;
  component: React.FC<any>;
}

export type Device = 'mobile' | 'tablet' | 'desktop';

export interface BlockComponentProps {}

export interface BlockConfig {
  type: BlockType;
  name: string;
  component: React.FC<BlockComponentProps>;
  icon: React.FC<{className?: string}>;
}

export interface Category {
  name: string;
  blocks: BlockConfig[];
}
