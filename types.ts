export type BarType = 'bar' | 'slider';

export type Language = 'en' | 'zh';

export interface ProgressBarConfig {
  currentProp: string;
  targetProp: string;
  completedIcon: string;
  incompleteIcon: string;
  sliderIcon: string; // Used specifically for slider type
  width: number;
  showPercent: boolean;
  doneMessage: string;
  type: BarType;
  textColor: string;
  backgroundColor: string;
}

export interface Preset {
  id: string;
  name: string;
  completed: string;
  incomplete: string;
  slider?: string; // Optional override for slider icon
  type: BarType;
}

export interface Translation {
  title: string;
  subtitle: string;
  openNotion: string;
  config: {
    title: string;
    dbProps: string;
    currentProp: string;
    targetProp: string;
    quickStyles: string;
    fineTuning: string;
    colors: string;
    textColor: string;
    bgColor: string;
    barStyle: string;
    sliderStyle: string;
    filled: string;
    knob: string;
    empty: string;
    width: string;
    celebration: string;
    celebrationHint: string;
    showPercent: string;
    none: string;
  };
  preview: {
    title: string;
    simulated: string;
    test: string;
  };
  code: {
    title: string;
    ready: string;
    copy: string;
    copied: string;
    hint: string;
  };
  guide: {
    title: string;
    steps: string[];
  };
  headerDropdown: {
    label: string;
    connect: string;
    shopResources: string;
  };
  footer: {
    brandName: string;
    slogan: string;
    socialsTitle: string;
    shopsTitle: string;
    copyright: string;
    links: {
      bilibili: string;
      xiaohongshu: string;
      wechat: string;
      taobao: string;
      xiaohongshuShop: string;
      notionMarket: string;
      customization: string;
      more: string;
    }
  };
}