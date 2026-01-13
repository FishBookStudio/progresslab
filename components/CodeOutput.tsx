import React, { useState } from 'react';
import { ProgressBarConfig, Translation } from '../types';
import { generateNotionFormula } from '../services/formulaGenerator';
import { Copy, Check, Terminal } from 'lucide-react';

interface CodeOutputProps {
  config: ProgressBarConfig;
  t: Translation['code'];
}

const CodeOutput: React.FC<CodeOutputProps> = ({ config, t }) => {
  const [copied, setCopied] = useState(false);
  const formula = generateNotionFormula(config);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formula);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 flex flex-col gap-4 flex-1">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-2 text-stone-700">
            <Terminal size={20} />
            <h2 className="text-lg font-bold">{t.title}</h2>
         </div>
         <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">
            {t.ready}
         </span>
      </div>

      <div className="relative group flex-1 flex flex-col min-h-0">
        <textarea
            readOnly
            value={formula}
            className="w-full h-48 md:h-full resize-none bg-stone-800 text-stone-100 p-4 rounded-xl font-mono text-xs md:text-sm leading-relaxed focus:outline-none border-4 border-stone-800 code-scroll"
            spellCheck="false"
        />
        
        <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
            <button
                onClick={handleCopy}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-95 ${
                    copied 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-stone-700 hover:bg-stone-900'
                }`}
            >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? t.copied : t.copy}
            </button>
        </div>
      </div>
      
      <p className="text-xs text-stone-400 text-center mt-2">
        {t.hint}
      </p>
    </div>
  );
};

export default CodeOutput;