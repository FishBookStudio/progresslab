import React from 'react';
import { ProgressBarConfig, Translation } from '../types';
import { NOTION_COLORS } from '../constants';
import { Settings2, LayoutTemplate, Palette } from 'lucide-react';

interface ConfigPanelProps {
  config: ProgressBarConfig;
  onChange: (newConfig: ProgressBarConfig) => void;
  t: Translation['config'];
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({ config, onChange, t }) => {
  const handleChange = (key: keyof ProgressBarConfig, value: any) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex items-center gap-2 text-rose-500 mb-2">
        <Settings2 size={20} />
        <h2 className="text-lg font-bold">{t.title}</h2>
      </div>

      {/* Database Properties */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wider">{t.dbProps}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-stone-700">{t.currentProp}</label>
            <input
              type="text"
              value={config.currentProp}
              onChange={(e) => handleChange('currentProp', e.target.value)}
              className="px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all text-sm"
              placeholder="e.g. Done"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-stone-700">{t.targetProp}</label>
            <input
              type="text"
              value={config.targetProp}
              onChange={(e) => handleChange('targetProp', e.target.value)}
              className="px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all text-sm"
              placeholder="e.g. Total"
            />
          </div>
        </div>
      </div>

      <hr className="border-stone-100" />

      {/* Colors */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Palette size={16} className="text-pink-400" />
          <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wider">{t.colors}</h3>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {/* Text Color */}
          <div className="flex flex-col gap-2">
             <label className="text-xs font-semibold text-stone-700">{t.textColor}</label>
             <div className="flex flex-wrap gap-2">
               {NOTION_COLORS.map(color => (
                 <button
                   key={color.name}
                   onClick={() => handleChange('textColor', color.name)}
                   className={`w-6 h-6 rounded-full border shadow-sm transition-transform hover:scale-110 ${
                     config.textColor === color.name ? 'ring-2 ring-stone-400 ring-offset-2' : 'border-stone-200'
                   }`}
                   style={{ backgroundColor: color.hex === 'inherit' ? '#ffffff' : color.hex }}
                   title={color.label}
                 >
                   {color.name === 'default' && <span className="block w-full h-full text-[10px] flex items-center justify-center text-stone-400">T</span>}
                 </button>
               ))}
             </div>
          </div>

          {/* Background Color */}
           <div className="flex flex-col gap-2">
             <label className="text-xs font-semibold text-stone-700">{t.bgColor}</label>
             <div className="flex flex-wrap gap-2">
               {NOTION_COLORS.map(color => (
                 <button
                   key={color.name}
                   onClick={() => handleChange('backgroundColor', color.name)}
                   className={`w-6 h-6 rounded-full border shadow-sm transition-transform hover:scale-110 ${
                     config.backgroundColor === color.name ? 'ring-2 ring-stone-400 ring-offset-2' : 'border-stone-200'
                   }`}
                   style={{ backgroundColor: color.bgHex === 'transparent' ? '#ffffff' : color.bgHex }}
                   title={`${color.label} Background`}
                 >
                    {color.name === 'default' && <span className="block w-full h-full text-[10px] flex items-center justify-center text-stone-400">/</span>}
                 </button>
               ))}
             </div>
          </div>
        </div>
      </div>

      <hr className="border-stone-100" />

      {/* Fine Tuning */}
      <div className="space-y-4">
         <div className="flex items-center gap-2">
          <LayoutTemplate size={16} className="text-indigo-400" />
          <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wider">{t.fineTuning}</h3>
        </div>
        
        {/* Type Selection */}
        <div className="flex bg-stone-100 p-1 rounded-xl">
            <button
              onClick={() => handleChange('type', 'bar')}
              className={`flex-1 py-1.5 text-sm font-bold rounded-lg transition-all ${config.type === 'bar' ? 'bg-white shadow-sm text-stone-800' : 'text-stone-500 hover:text-stone-700'}`}
            >
              {t.barStyle}
            </button>
            <button
              onClick={() => handleChange('type', 'slider')}
              className={`flex-1 py-1.5 text-sm font-bold rounded-lg transition-all ${config.type === 'slider' ? 'bg-white shadow-sm text-stone-800' : 'text-stone-500 hover:text-stone-700'}`}
            >
              {t.sliderStyle}
            </button>
        </div>

        {/* Custom Icons Inputs */}
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col gap-1">
             <label className="text-xs font-semibold text-stone-500">{t.filled}</label>
             <input 
                type="text" 
                value={config.completedIcon}
                onChange={(e) => handleChange('completedIcon', e.target.value)}
                className="text-center py-2 rounded-lg border border-stone-200 focus:ring-2 focus:ring-rose-200 outline-none"
             />
          </div>
          
          {config.type === 'slider' && (
             <div className="flex flex-col gap-1">
               <label className="text-xs font-semibold text-rose-500">{t.knob}</label>
               <input 
                  type="text" 
                  value={config.sliderIcon}
                  onChange={(e) => handleChange('sliderIcon', e.target.value)}
                  className="text-center py-2 rounded-lg border-2 border-rose-100 focus:ring-2 focus:ring-rose-200 outline-none bg-rose-50"
               />
            </div>
          )}

          <div className="flex flex-col gap-1">
             <label className="text-xs font-semibold text-stone-500">{t.empty}</label>
             <input 
                type="text" 
                value={config.incompleteIcon}
                onChange={(e) => handleChange('incompleteIcon', e.target.value)}
                className="text-center py-2 rounded-lg border border-stone-200 focus:ring-2 focus:ring-rose-200 outline-none"
             />
          </div>
        </div>
        
        {/* Width Slider */}
        <div className="space-y-2">
            <div className="flex justify-between">
                <label className="text-sm font-semibold text-stone-700">{t.width}</label>
                <span className="text-sm font-mono text-stone-500 bg-stone-100 px-2 rounded">{config.width} chars</span>
            </div>
            <input 
                type="range" 
                min="5" 
                max="15" 
                value={config.width}
                onChange={(e) => handleChange('width', parseInt(e.target.value))}
                className="w-full accent-rose-500 h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer"
            />
        </div>

        {/* 100% Message */}
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-stone-700">{t.celebration}</label>
            <input
              type="text"
              value={config.doneMessage}
              onChange={(e) => handleChange('doneMessage', e.target.value)}
              className="px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all text-sm"
              placeholder="e.g. ✅ Done!"
            />
            <p className="text-xs text-stone-400">{t.celebrationHint}</p>
        </div>

        {/* Toggle Show Percent */}
        <div className="flex items-center justify-between p-3 rounded-xl border border-stone-100 bg-stone-50">
            <label className="text-sm font-semibold text-stone-700 cursor-pointer" htmlFor="showPercent">{t.showPercent}</label>
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input 
                    type="checkbox" 
                    name="showPercent" 
                    id="showPercent" 
                    checked={config.showPercent}
                    onChange={(e) => handleChange('showPercent', e.target.checked)}
                    className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out checked:translate-x-full checked:border-rose-500"
                />
                <label htmlFor="showPercent" className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer ${config.showPercent ? 'bg-rose-500' : 'bg-stone-300'}`}></label>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ConfigPanel;