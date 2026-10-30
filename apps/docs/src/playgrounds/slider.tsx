import { Slider } from '@wideset/react';

import { attrs, playground, type Values } from '../lib/playground-kit';

const startValue = (v: Values) => (v.type === 'range' ? '[20, 80]' : '[40]');

/**
 * Type and min/max label position come from `SliderProps`. The value tooltip
 * (`showTooltipValue` takes a boolean or a side) and `disabled` (from Radix) are written by
 * hand. `defaultValue` is read once, so the stage remounts the slider when the type changes.
 */
export default playground({
  from: 'SliderProps',
  labels: { labels: 'Min and max' },
  // Not set draws no labels; both sides is how the slider is usually drawn.
  optional: { labels: 'None' },
  defaults: { labels: 'side' },
  content: [
    { key: 'tooltip', label: 'Value tooltip', type: 'switch', default: false },
    { key: 'disabled', label: 'Disabled', type: 'switch', default: false, group: 'State' },
  ],
  render: (v, { props }) => (
    <div className="w-[20rem] max-w-full">
      <Slider
        key={String(v.type)}
        {...props()}
        defaultValue={v.type === 'range' ? [20, 80] : [40]}
        showTooltipValue={Boolean(v.tooltip)}
        disabled={Boolean(v.disabled)}
      />
    </div>
  ),
  // `defaultValue` sits among the generated props, and the tag breaks onto lines once it is long.
  code: (v) => {
    const props = [
      attrs([['type', v.type, 'single']]),
      `defaultValue={${startValue(v)}}`,
      v.labels ? `labels="${v.labels}"` : '',
      attrs([['showTooltipValue', v.tooltip, false]]),
      attrs([['disabled', v.disabled, false]]),
    ].filter(Boolean);
    return props.join(' ').length > 70
      ? `<Slider\n${props.map((p) => `  ${p}`).join('\n')}\n/>`
      : `<Slider ${props.join(' ')} />`;
  },
});
