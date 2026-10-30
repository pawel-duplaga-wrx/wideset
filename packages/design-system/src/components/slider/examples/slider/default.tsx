/** The playground's stage: one slider with a value picked, its props set from the rail. */
import { Slider, type SliderProps } from '@wideset/react';

export default function SliderDefault(props: SliderProps) {
  return (
    <div className="w-[20rem] max-w-full">
      <Slider aria-label="Volume" defaultValue={[40]} {...props} />
    </div>
  );
}
