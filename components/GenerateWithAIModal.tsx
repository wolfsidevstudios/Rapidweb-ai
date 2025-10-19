import React, { useState } from 'react';
import { generatePageLayout } from '../services/geminiService';
import { Block } from '../types';
import { AVAILABLE_BLOCKS } from '../constants';
import { useApiKey } from '../context/ApiKeyContext';

interface GenerateWithAIModalProps {
  onClose: () => void;
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
}

export const GenerateWithAIModal: React.FC<GenerateWithAIModalProps> = ({ onClose, setBlocks }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { apiKey } = useApiKey();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey) {
      setError('Please set your Gemini API key in the settings before generating a layout.');
      return;
    }
    if (!prompt.trim()) {
      setError('Please enter a description for your website.');
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const layoutWithContent = await generatePageLayout(prompt, apiKey);
      // FIX: Explicitly type the return of the map function to `Block | null`.
      // This resolves a TypeScript error where the inferred type from the returned object (with a required `props` property)
      // was not compatible with the `Block` type (which has an optional `props` property) used in the `.filter` type predicate.
      const newBlocks: Block[] = layoutWithContent.map((item, index): Block | null => {
        const blockConfig = AVAILABLE_BLOCKS.flatMap(cat => cat.blocks).find(b => b.type === item.type);
        if (!blockConfig) return null;
        return {
          id: new Date().getTime() + index,
          type: item.type,
          component: blockConfig.component,
          props: item.props,
        };
      }).filter((b): b is Block => b !== null);
      
      setBlocks(newBlocks);
      onClose();
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white rounded-xl shadow-2xl p-8 m-4 max-w-lg w-full transform transition-all duration-300 scale-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-slate-800">Generate Page with AI</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-slate-600 mb-6">Describe the website you want to create, and our AI will generate a starting layout for you.</p>
        <form onSubmit={handleSubmit}>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A modern landing page for a new fitness app called 'FitTrack'"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow duration-200 mb-4 h-32 resize-none"
            disabled={isLoading}
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex justify-end space-x-4">
             <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-6 py-2 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                'Generate Layout'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
