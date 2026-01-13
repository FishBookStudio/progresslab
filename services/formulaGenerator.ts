import { ProgressBarConfig } from '../types';

/**
 * Escapes characters for Notion Formula strings
 */
const escape = (str: string) => str.replace(/"/g, '\\"').replace(/\\/g, '\\\\');

/**
 * Generates the Notion Formula 2.0 code based on configuration
 */
export const generateNotionFormula = (config: ProgressBarConfig): string => {
  const {
    currentProp,
    targetProp,
    completedIcon,
    incompleteIcon,
    sliderIcon,
    width,
    showPercent,
    doneMessage,
    type,
    textColor,
    backgroundColor
  } = config;

  const currentVar = `prop("${escape(currentProp)}")`;
  const targetVar = `prop("${escape(targetProp)}")`;

  // Core calculation variables
  // We use max(target, 1) to prevent division by zero errors
  const setupVars = `
  /* Variables Setup */
  current, ${currentVar},
  target, max(${targetVar}, 1),
  percent, current / target,
  /* Ensure percentage doesn't exceed 100% for visual calculation */
  cappedPercent, min(percent, 1),
  `;

  let visualLogic = '';

  if (type === 'bar') {
    // Bar Logic: filled + empty
    visualLogic = `
  filledCount, floor(cappedPercent * ${width}),
  emptyCount, ${width} - filledCount,
  visual, repeat("${escape(completedIcon)}", filledCount) + repeat("${escape(incompleteIcon)}", emptyCount),
    `;
  } else {
    // Slider Logic: left track + knob + right track
    // For slider, we effectively replace one character at the position
    visualLogic = `
  pos, floor(cappedPercent * ${width}),
  /* Clamp pos to allow knob to be at end */
  safePos, min(pos, ${width} - 1),
  leftCount, safePos,
  rightCount, ${width} - 1 - safePos,
  visual, repeat("${escape(completedIcon)}", leftCount) + "${escape(sliderIcon)}" + repeat("${escape(incompleteIcon)}", rightCount),
    `;
  }

  // Construct the final output string logic
  // If percent >= 1 (100%), show doneMessage (if set), otherwise show visual + percent
  const doneCheck = doneMessage.trim() !== '' 
    ? `if(percent >= 1, "${escape(doneMessage)}", output)`
    : `output`;

  const percentDisplay = showPercent 
    ? ` + " " + format(floor(percent * 100)) + "%"` 
    : ``;

  // Handle Styling
  const styles: string[] = [];
  if (textColor && textColor !== 'default') {
    styles.push(`"${textColor}"`);
  }
  if (backgroundColor && backgroundColor !== 'default') {
    styles.push(`"${backgroundColor}_background"`);
  }

  const finalOutput = styles.length > 0 
    ? `(${doneCheck}).style(${styles.join(', ')})` 
    : doneCheck;

  return `lets(
${setupVars}${visualLogic}
  output, visual${percentDisplay},
  ${finalOutput}
)`;
};

/**
 * Simulates the Notion formula in JavaScript for the Live Preview
 */
export const simulatePreview = (config: ProgressBarConfig, percent: number): string => {
  const {
    completedIcon,
    incompleteIcon,
    sliderIcon,
    width,
    showPercent,
    doneMessage,
    type,
  } = config;

  // Handle 100% case
  if (percent >= 1 && doneMessage.trim() !== '') {
    return doneMessage;
  }

  const cappedPercent = Math.min(percent, 1);
  let visual = '';

  if (type === 'bar') {
    const filledCount = Math.floor(cappedPercent * width);
    const emptyCount = width - filledCount;
    visual = completedIcon.repeat(Math.max(0, filledCount)) + incompleteIcon.repeat(Math.max(0, emptyCount));
  } else {
    const pos = Math.floor(cappedPercent * width);
    const safePos = Math.min(pos, width - 1);
    const leftCount = safePos;
    const rightCount = width - 1 - safePos;
    visual = completedIcon.repeat(Math.max(0, leftCount)) + sliderIcon + incompleteIcon.repeat(Math.max(0, rightCount));
  }

  const percentStr = showPercent ? ` ${Math.floor(percent * 100)}%` : '';
  return `${visual}${percentStr}`;
};