import React, { useState, useMemo } from 'react';
import { ProgressBarConfig, Translation } from '../types';
import { simulatePreview } from '../services/formulaGenerator';
import { NOTION_COLORS } from '../constants';
import { Eye, MonitorPlay } from 'lucide-react';

interface PreviewCardProps {
  config: ProgressBarConfig;
  t: Translation['preview'];
}

const PreviewCard: React.FC<PreviewCardProps> = ({ config, t }) => {
  const [testPercent, setTestPercent] = useState(0.65);

  const previewText = useMemo(() => {
    return simulatePreview(config, testPercent);
  }, [config, testPercent]);

  // Find colors for preview
  const textColorObj = NOTION_COLORS.find(c => c.name === config.textColor);
  const bgColorObj = NOTION_COLORS.find(c => c.name === config.backgroundColor);

  const previewStyle = {
    color: textColorObj && textColorObj.hex !== 'inherit' ? textColorObj.hex : 'inherit',
    backgroundColor: bgColorObj && bgColorObj.bgHex !== 'transparent' ? bgColorObj.bgHex : 'transparent',
    padding: '4px 8px',
    borderRadius: '4px',
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 flex flex-col gap-4">
      <div className="flex items-center gap-2 text-indigo-500">
        <Eye size={20} />
        <h2 className="text-lg font-bold">{t.title}</h2>
      </div>

      <div className="bg-[#FAF9F6] border-2 border-stone-100 rounded-xl p-8 flex items-center justify-center min-h-[120px] relative overflow-hidden">
         {/* Notion-like simple text display with styles */}
         <div className="text-xl font-mono text-stone-800 break-all text-center leading-relaxed" style={previewStyle}>
            {previewText}
         </div>
         
         <div className="absolute top-2 right-2 text-[10px] text-stone-400 font-bold uppercase tracking-widest bg-stone-100 px-2 py-1 rounded">
            {t.simulated}
         </div>
      </div>

      {/* Test Controls */}
      <div className="space-y-2 mt-2">
        <div className="flex justify-between items-center text-xs font-semibold text-stone-500 uppercase tracking-wide">
            <span className="flex items-center gap-1"><MonitorPlay size={12}/> {t.test}</span>
            <span>{Math.min(Math.round(testPercent * 100), 100)}%</span>
        </div>
        <input 
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={testPercent}
            onChange={(e) => setTestPercent(parseFloat(e.target.value))}
            className="w-full accent-indigo-500 h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-stone-400">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;