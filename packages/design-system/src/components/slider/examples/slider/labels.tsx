/**
 * `labels` prints the slider's `min` and `max` so the reader knows the scale. Side puts them at
 * both ends and is the usual choice; bottom moves them under the track when the row is narrow;
 * left or right shows one end only. They are plain numbers, so still name what the slider
 * sets in a visible label next to it.
 */
import { Slider } from '@wideset/react';

export default function SliderLabels() {
  return (
    <div className="gap-ws-16 flex w-[20rem] max-w-full flex-col">
      {(['side', 'bottom', 'left', 'right'] as const).map((labels) => (
        <Slider key={labels} aria-label="Volume" labels={labels} defaultValue={[40]} />
      ))}
    </div>
  );
}
