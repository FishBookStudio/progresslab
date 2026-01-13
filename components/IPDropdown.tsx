import React, { useState, useRef, useEffect } from 'react';
import { Translation } from '../types';
import { SOCIAL_URLS } from '../constants';
import { IconNotion, IconTaobao, IconShop } from './BrandIcons';
import { ChevronDown, ShoppingBag, Wrench } from 'lucide-react';

interface IPDropdownProps {
  t: Translation;
}

const IPDropdown: React.FC<IPDropdownProps> = ({ t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const DropdownLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-3 py-2 text-sm text-stone-600 hover:bg-stone-50 hover:text-rose-500 rounded-lg transition-colors group"
      onClick={() => setIsOpen(false)}
    >
      <span className="text-stone-400 group-hover:text-rose-500 transition-colors">{icon}</span>
      <span className="font-medium">{label}</span>
    </a>
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold transition-all ${
          isOpen ? 'bg-rose-50 text-rose-600' : 'text-stone-400 hover:text-rose-500 hover:bg-stone-50'
        }`}
        title={t.headerDropdown.shopResources}
      >
        <IconShop size={20} />
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-stone-100 p-2 z-50">
          {/* Section: Resources & Shops */}
          <div className="p-1">
            <div className="space-y-1">
               <DropdownLink href={SOCIAL_URLS.taobao} icon={<IconTaobao size={16} />} label={t.footer.links.taobao} />
               <DropdownLink href={SOCIAL_URLS.xiaohongshuShop} icon={<ShoppingBag size={16} />} label={t.footer.links.xiaohongshuShop} />
               <DropdownLink href={SOCIAL_URLS.notionMarket} icon={<IconNotion size={16} />} label={t.footer.links.notionMarket} />
               <DropdownLink href={SOCIAL_URLS.customization} icon={<Wrench size={16} />} label={t.footer.links.customization} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IPDropdown;