import React, { useState } from 'react';
import ConfigPanel from './components/ConfigPanel';
import StylePanel from './components/StylePanel';
import PreviewCard from './components/PreviewCard';
import CodeOutput from './components/CodeOutput';
import Footer from './components/Footer';
import IPDropdown from './components/IPDropdown';
import { IconBilibili, IconXiaohongshu, IconWeChat, IconTranslate, IconLogo } from './components/BrandIcons';
import { ProgressBarConfig, Language } from './types';
import { DEFAULT_CONFIG, TRANSLATIONS, SOCIAL_URLS } from './constants';
import { Heart } from 'lucide-react';

const App: React.FC = () => {
  const [config, setConfig] = useState<ProgressBarConfig>(DEFAULT_CONFIG);
  const [lang, setLang] = useState<Language>('en');

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'zh' : 'en');
  };

  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen bg-paper flex flex-col font-sans">
      {/* Navbar */}
      <header className="bg-white border-b border-stone-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-rose-100 p-2 rounded-xl text-rose-500">
                <IconLogo size={24} />
            </div>
            <div>
                <h1 className="text-xl md:text-2xl font-extrabold text-stone-800 tracking-tight">{t.title}</h1>
                <p className="text-xs text-stone-500 font-medium">{t.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
             {/* Direct Social Icons */}
             <div className="flex items-center gap-1">
                <a href={SOCIAL_URLS.bilibili} target="_blank" rel="noreferrer" className="p-2 text-stone-400 hover:text-rose-500 transition-colors" title="Bilibili">
                    <IconBilibili size={20} />
                </a>
                <a href={SOCIAL_URLS.xiaohongshu} target="_blank" rel="noreferrer" className="p-2 text-stone-400 hover:text-rose-500 transition-colors" title="Xiaohongshu">
                    <IconXiaohongshu size={20} />
                </a>
                <a href={SOCIAL_URLS.wechat} target="_blank" rel="noreferrer" className="p-2 text-stone-400 hover:text-rose-500 transition-colors" title="WeChat">
                    <IconWeChat size={20} />
                </a>
             </div>

             <div className="w-px h-6 bg-stone-200 hidden sm:block"></div>

             <IPDropdown t={t} />
             
             <div className="w-px h-6 bg-stone-200 hidden sm:block"></div>

             <button 
                onClick={toggleLanguage}
                className="p-2 rounded-lg text-stone-400 hover:text-rose-500 hover:bg-stone-50 transition-colors"
                title={lang === 'en' ? 'Switch to Chinese' : 'Switch to English'}
             >
                <IconTranslate size={20} />
             </button>
             <a href="https://notion.so" target="_blank" rel="noreferrer" className="hidden sm:block text-sm font-bold text-rose-400 hover:text-rose-500 transition-colors">
                {t.openNotion} ↗
             </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
          
          {/* Left Column: Structure Configuration & Guide */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <ConfigPanel config={config} onChange={setConfig} t={t.config} />
            
            <div className="bg-rose-50 rounded-xl p-4 border border-rose-100 text-rose-800 text-sm flex gap-3 items-start">
                <Heart size={18} className="mt-1 shrink-0 text-rose-400 fill-rose-400" />
                <div>
                    <span className="font-bold block mb-1">{t.guide.title}</span>
                    <ol className="list-decimal pl-4 space-y-1 text-rose-700/80">
                        {t.guide.steps.map((step, index) => (
                           <li key={index}>{step}</li>
                        ))}
                    </ol>
                </div>
            </div>
          </div>

          {/* Right Column: Preview, Styles, & Output */}
          <div className="lg:col-span-7 flex flex-col gap-6 sticky top-24 self-start">
            <PreviewCard config={config} t={t.preview} />
            <StylePanel config={config} onChange={setConfig} t={t.config} />
            <CodeOutput config={config} t={t.code} />
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer t={t.footer} />
    </div>
  );
};

export default App;