import React from 'react';

export type BlockType =
  | 'navbar'
  | 'hero'
  | 'features'
  | 'cta'
  | 'testimonials'
  | 'contact'
  | 'footer'
  | 'gallery'
  | 'pricing'
  | 'team'
  | 'stats'
  | 'logocloud';

export interface Block {
  id: number;
  type: BlockType;
  component: React.FC<any>;
  props?: Record<string, any>;
}

export type Device = 'mobile' | 'tablet' | 'desktop';

// Type for the AI-generated layout from Gemini
export interface GeneratedLayoutItem {
  type: BlockType;
  props: Record<string, any>;
}
