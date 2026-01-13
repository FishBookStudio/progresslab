import React from 'react';
import { Translation } from '../types';
import { SOCIAL_URLS } from '../constants';
import { IconBilibili, IconNotion, IconTaobao, IconWeChat, IconXiaohongshu } from './BrandIcons';
import { ExternalLink, ShoppingBag, Wrench, Sparkles, BookOpen } from 'lucide-react';

interface FooterProps {
  t: Translation['footer'];
}

const FooterLink: React.FC<{ href: string; icon: React.ReactNode; label: string }> = ({ href, icon, label }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="flex items-center gap-2 text-stone-500 hover:text-rose-500 transition-colors text-sm group"
  >
    <span className="text-stone-400 group-hover:text-rose-500 transition-colors">{icon}</span>
    <span>{label}</span>
    <ExternalLink size={10} className="opacity-0 group-hover:opacity-50 transition-opacity" />
  </a>
);

const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="bg-stone-50 border-t border-stone-100 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          {/* Brand Column */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div>
                <h3 className="text-lg font-extrabold text-stone-800 flex items-center gap-2">
                    <span className="text-xl">🐟</span> {t.brandName}
                </h3>
                <p className="text-sm text-stone-500 mt-2 font-medium">{t.slogan}</p>
            </div>
            <div className="text-xs text-stone-400 mt-auto">
               <p>{t.copyright.replace('{year}', new Date().getFullYear().toString())}</p>
            </div>
          </div>

          {/* Socials Column */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-stone-800 text-sm uppercase tracking-wider">{t.socialsTitle}</h4>
            <div className="flex flex-col gap-3">
              <FooterLink href={SOCIAL_URLS.bilibili} icon={<IconBilibili size={16} />} label={t.links.bilibili} />
              <FooterLink href={SOCIAL_URLS.xiaohongshu} icon={<IconXiaohongshu size={16} />} label={t.links.xiaohongshu} />
              <FooterLink href={SOCIAL_URLS.wechat} icon={<IconWeChat size={16} />} label={t.links.wechat} />
            </div>
          </div>

          {/* Shops Column */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-stone-800 text-sm uppercase tracking-wider">{t.shopsTitle}</h4>
            <div className="flex flex-col gap-3">
              <FooterLink href={SOCIAL_URLS.taobao} icon={<IconTaobao size={16} />} label={t.links.taobao} />
              <FooterLink href={SOCIAL_URLS.xiaohongshuShop} icon={<ShoppingBag size={16} />} label={t.links.xiaohongshuShop} />
              <FooterLink href={SOCIAL_URLS.notionMarket} icon={<IconNotion size={16} />} label={t.links.notionMarket} />
              <FooterLink href={SOCIAL_URLS.customization} icon={<Wrench size={16} />} label={t.links.customization} />
              <FooterLink href={SOCIAL_URLS.more} icon={<Sparkles size={16} />} label={t.links.more} />
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;