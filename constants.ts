import { Preset, ProgressBarConfig, Translation } from './types';

export const DEFAULT_CONFIG: ProgressBarConfig = {
  currentProp: 'Done',
  targetProp: 'Target',
  completedIcon: '▓',
  incompleteIcon: '░',
  sliderIcon: '●',
  width: 10,
  showPercent: true,
  doneMessage: '✅ Done!',
  type: 'bar',
  textColor: 'default',
  backgroundColor: 'default',
};

export const NOTION_COLORS = [
  { name: 'default', label: 'Default', hex: 'inherit', bgHex: 'transparent' },
  { name: 'gray', label: 'Gray', hex: '#9B9A97', bgHex: '#F1F1EF' },
  { name: 'brown', label: 'Brown', hex: '#64473A', bgHex: '#F4EEEE' },
  { name: 'orange', label: 'Orange', hex: '#D9730D', bgHex: '#FAEBDD' },
  { name: 'yellow', label: 'Yellow', hex: '#DFAB01', bgHex: '#FBF3DB' },
  { name: 'green', label: 'Green', hex: '#0F7B6C', bgHex: '#DDEDEA' },
  { name: 'blue', label: 'Blue', hex: '#0B6E99', bgHex: '#DDEBF1' },
  { name: 'purple', label: 'Purple', hex: '#6940A5', bgHex: '#EAE4F2' },
  { name: 'pink', label: 'Pink', hex: '#AD1A72', bgHex: '#F4DFEB' },
  { name: 'red', label: 'Red', hex: '#E03E3E', bgHex: '#FBE4E4' },
];

export const PRESETS: Preset[] = [
  { id: 'blocks', name: 'Classic Blocks', completed: '▓', incomplete: '░', type: 'bar' },
  { id: 'circles', name: 'Moons', completed: '🌕', incomplete: '🌑', type: 'bar' },
  { id: 'hearts', name: 'Love', completed: '♥', incomplete: '♡', type: 'bar' },
  { id: 'stars', name: 'Ratings', completed: '★', incomplete: '☆', type: 'bar' },
  { id: 'squares', name: 'Clean Squares', completed: '■', incomplete: '□', type: 'bar' },
  { id: 'plants', name: 'Growth', completed: '🌳', incomplete: '🌱', type: 'bar' },
  { id: 'slider_line', name: 'Slider Line', completed: '─', incomplete: '─', slider: '●', type: 'slider' },
  { id: 'slider_track', name: 'Slider Track', completed: '═', incomplete: '═', slider: '📍', type: 'slider' },
  { id: 'cat_run', name: 'Cat Run', completed: '🐾', incomplete: '·', slider: '🐈', type: 'slider' },
];

export const SOCIAL_URLS = {
  bilibili: "https://space.bilibili.com/384944410?spm_id_from=333.1007.0.0",
  xiaohongshu: "https://www.xiaohongshu.com/user/profile/64283cd9000000001102147b?m_source=pwa",
  wechat: "https://mp.weixin.qq.com/s/e1WvmnYBE7paaesM1JmqCw",
  taobao: "https://m.tb.cn/h.7kNnSMiJnFAQPwp",
  xiaohongshuShop: "https://xhslink.com/m/7l8OlKOK6ex",
  notionMarket: "https://www.notion.so/@fishbookstudio",
  customization: "https://www.notion.so/2307aed0d3d380d7bdb6df5a98700566?source=copy_link",
  more: "https://fast-banon-5bc.notion.site/FishBook-Studio-11c7aed0d3d380c89025e29eb6591b3d?source=copy_link"
};

export const TRANSLATIONS: Record<'en' | 'zh', Translation> = {
  en: {
    title: "Progress Lab",
    subtitle: "No-code formula generator",
    openNotion: "Open Notion",
    config: {
      title: "Configuration",
      dbProps: "Database Properties",
      currentProp: "Current Value Property",
      targetProp: "Target/Total Property",
      quickStyles: "Quick Styles",
      fineTuning: "Fine Tuning",
      colors: "Colors",
      textColor: "Text Color",
      bgColor: "Background",
      barStyle: "Bar Style",
      sliderStyle: "Slider Style",
      filled: "Filled / Left",
      knob: "Knob / Icon",
      empty: "Empty / Right",
      width: "Bar Width",
      celebration: "100% Celebration (Optional)",
      celebrationHint: "Shows this instead of the bar when complete.",
      showPercent: "Show Percentage number",
      none: "None"
    },
    preview: {
      title: "Live Preview",
      simulated: "Simulated",
      test: "Test Progress"
    },
    code: {
      title: "Formula Code",
      ready: "Notion 2.0 Ready",
      copy: "Copy Formula",
      copied: "Copied!",
      hint: "Paste this directly into a Notion Formula property."
    },
    guide: {
      title: "How to use:",
      steps: [
        "Ensure your Notion database has the properties defined in Config (default: \"Done\" and \"Target\").",
        "Copy the generated formula code.",
        "Add a new Formula property in Notion.",
        "Paste the code and save! ✨"
      ]
    },
    headerDropdown: {
      label: "Fishbook Studio",
      connect: "Connect",
      shopResources: "Store & Resources"
    },
    footer: {
      brandName: "Fishbook Studio",
      slogan: "Leave complexity to the system.",
      socialsTitle: "Connect",
      shopsTitle: "Store & Resources",
      copyright: "© {year} Fishbook Studio. Built for Notion Lovers.",
      links: {
        bilibili: "Bilibili",
        xiaohongshu: "RedNote",
        wechat: "WeChat",
        taobao: "Taobao Store",
        xiaohongshuShop: "RedNote Store",
        notionMarket: "Notion Market",
        customization: "Customization",
        more: "More Resources"
      }
    }
  },
  zh: {
    title: "进度条生成器",
    subtitle: "零代码可视化公式生成器",
    openNotion: "打开 Notion",
    config: {
      title: "配置参数",
      dbProps: "数据库属性",
      currentProp: "分子名",
      targetProp: "分母名",
      quickStyles: "快速样式",
      fineTuning: "样式",
      colors: "配色设置",
      textColor: "文字颜色",
      bgColor: "背景颜色",
      barStyle: "填充条样式",
      sliderStyle: "滑块样式",
      filled: "填充 / 左侧",
      knob: "滑块 / 图标",
      empty: "未填 / 右侧",
      width: "进度条宽度",
      celebration: "完成样式",
      celebrationHint: "完成时显示此内容代替进度条。",
      showPercent: "显示百分比数字",
      none: "无"
    },
    preview: {
      title: "实时预览",
      simulated: "模拟效果",
      test: "测试进度"
    },
    code: {
      title: "公式代码",
      ready: "适配 Notion 2.0",
      copy: "复制公式",
      copied: "已复制!",
      hint: "直接粘贴到 Notion 的公式属性中。"
    },
    guide: {
      title: "使用说明:",
      steps: [
        "将 Notion 数据库中作分子和分母的属性名分别填入",
        "设置样式",
        "复制生成的公式代码。",
        "在 Notion 中添加一个新的 Formula (公式) 属性。",
        "粘贴代码并保存！✨"
      ]
    },
    headerDropdown: {
      label: "鳕鱼的笔记研究所",
      connect: "关注我",
      shopResources: "资源与商店"
    },
    footer: {
      brandName: "鳕鱼的笔记研究所",
      slogan: "把复杂的事，交给系统。",
      socialsTitle: "关注我",
      shopsTitle: "店铺与资源",
      copyright: "© {year} 鳕鱼的笔记研究所. 为 Notion 爱好者打造.",
      links: {
        bilibili: "Bilibili",
        xiaohongshu: "小红书",
        wechat: "公众号",
        taobao: "淘宝店铺",
        xiaohongshuShop: "小红书店铺",
        notionMarket: "Notion Market",
        customization: "模板定制",
        more: "更多资源"
      }
    }
  }
};