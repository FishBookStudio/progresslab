import React from 'react';
import { ProgressBarConfig, Preset, Translation } from '../types';
import { PRESETS } from '../constants';
import { Sparkles } from 'lucide-react';

interface StylePanelProps {
  config: ProgressBarConfig;
  onChange: (newConfig: ProgressBarConfig) => void;
  t: Translation['config'];
}

const StylePanel: React.FC<StylePanelProps> = ({ config, onChange, t }) => {
  const applyPreset = (preset: Preset) => {
    onChange({
      ...config,
      completedIcon: preset.completed,
      incompleteIcon: preset.incomplete,
      sliderIcon: preset.slider || config.sliderIcon,
      type: preset.type,
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex items-center gap-2 text-amber-500 mb-1">
        <Sparkles size={20} />
        <h2 className="text-lg font-bold">{t.quickStyles}</h2>
      </div>

      {/* Style Presets */}
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset)}
              className={`p-2 rounded-xl text-sm border transition-all hover:shadow-md flex flex-col items-center gap-1 ${
                config.completedIcon === preset.completed && config.type === preset.type
                  ? 'bg-rose-50 border-rose-300 text-rose-700 ring-2 ring-rose-100'
                  : 'bg-stone-50 border-transparent hover:bg-white text-stone-600'
              }`}
            >
              <span className="text-lg">{preset.type === 'slider' ? preset.slider : preset.completed}</span>
              <span className="text-xs opacity-70 font-medium">{preset.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StylePanel;