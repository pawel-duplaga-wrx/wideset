/** `single` picks one value, `range` picks an interval between two thumbs. Each thumb is its own stop in the tab order and moves with the arrow keys; Page Up and Page Down jump ten steps, Home and End go to the ends. */
import { Slider } from '@wideset/react';

export default function SliderTypes() {
  return (
    <div className="gap-ws-16 flex w-[20rem] max-w-full flex-col">
      <Slider type="single" aria-label="Volume" defaultValue={[40]} labels="side" />
      <Slider
        type="range"
        thumbAriaLabels={['Minimum price', 'Maximum price']}
        defaultValue={[20, 80]}
        labels="side"
      />
    </div>
  );
}
