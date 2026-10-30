import * as SliderPrimitive from '@radix-ui/react-slider';
import { type PointerEvent, useId, useRef, useState } from 'react';
import { cn } from 'src/lib/utils';

import { useDefaultMotion } from '../../motion/MotionProvider';
import { Tooltip } from '../tooltip/Tooltip';
import type { SliderThumbProps, SliderTooltipPosition } from './Slider.types';
import { sliderThumbMotionVariants } from './Slider.variants';

// Figma draws the control as a 19x12 frame with a 2px OUTSIDE stroke, so the outer
// contour is 23x16 with radius 6 + 2 = 8. CSS radius describes the outer contour, so
// rounded-ws-control-lg (8px) is what reproduces it — it also leaves the inner edge at
// 8 - 2 = 6px, matching the frame's own cornerRadius.
const thumbClassName = cn(
  'group shadow-ws-controls-control rounded-ws-control-lg h-ws-9 px-ws-4 py-ws-2 flex w-[23px] items-center justify-center',
  'border-ws-dynamic-primary-default bg-ws-static-foreground border-2',
  'hover:border-ws-dynamic-primary-hover active:border-ws-dynamic-primary-strong-default',
  'cursor-pointer outline-2 outline-offset-2 outline-transparent',
  'data-disabled:border-ws-dynamic-secondary-default data-disabled:pointer-events-none',
);

const focusVisibleClassName =
  'border-ws-dynamic-primary-strong-default outline-ws-dynamic-primary-strong-default select-none';

// Mirrors Figma's `Lines` frame: 7x4, three 1x4 lines separated by 2px.
// Drawn as one crispEdges SVG rather than three 1px boxes — independently rasterized
// hairlines land on different subpixel offsets under browser zoom or a 1x display and
// then render at visibly different thicknesses.
const ThumbDots = () => (
  <svg
    aria-hidden
    width={7}
    height={4}
    viewBox="0 0 7 4"
    shapeRendering="crispEdges"
    className="fill-[var(--ws-dynamic-stroke-primary-default)] group-data-disabled:hidden"
  >
    {[0, 3, 6].map((x) => (
      <rect key={x} x={x} y={0} width={1} height={4} />
    ))}
  </svg>
);

const getTooltipSide = (
  showTooltipValue: SliderThumbProps['showTooltipValue'],
): SliderTooltipPosition => (typeof showTooltipValue === 'string' ? showTooltipValue : 'top');

export const SliderThumb = ({
  value,
  showTooltipValue,
  defaultMotion,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
}: SliderThumbProps) => {
  const motion = useDefaultMotion(defaultMotion);
  const thumbId = useId();
  const labelledBy = ariaLabelledby && ariaLabel ? `${ariaLabelledby} ${thumbId}` : ariaLabelledby;
  const [isDragging, setIsDragging] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusVisible, setIsFocusVisible] = useState(false);
  const isPointerFocusRef = useRef(false);

  const handlePointerDown = (e: PointerEvent<HTMLSpanElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    isPointerFocusRef.current = true;
  };

  const handleFocus = () => {
    setIsFocused(true);
    setIsFocusVisible(!isPointerFocusRef.current);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsFocusVisible(false);
    isPointerFocusRef.current = false;
  };

  const className = cn(
    thumbClassName,
    sliderThumbMotionVariants({ enabled: motion }),
    isFocusVisible && focusVisibleClassName,
  );

  const thumb = (
    <SliderPrimitive.Thumb
      className={className}
      id={labelledBy === ariaLabelledby ? undefined : thumbId}
      data-slot="slider-thumb"
      aria-label={ariaLabel}
      aria-labelledby={labelledBy}
      onPointerDown={
        showTooltipValue ? handlePointerDown : () => (isPointerFocusRef.current = true)
      }
      onLostPointerCapture={showTooltipValue ? () => setIsDragging(false) : undefined}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <ThumbDots />
    </SliderPrimitive.Thumb>
  );

  if (!showTooltipValue) {
    return thumb;
  }

  return (
    <Tooltip
      open={isDragging || isFocused}
      arrow={false}
      variant="inverse"
      delayDuration={0}
      defaultMotion={motion}
    >
      <Tooltip.Trigger asChild>{thumb}</Tooltip.Trigger>
      <Tooltip.Content side={getTooltipSide(showTooltipValue)} className="m-ws-2 px-ws-3 py-ws-2">
        <Tooltip.Label>{value}</Tooltip.Label>
      </Tooltip.Content>
    </Tooltip>
  );
};

SliderThumb.displayName = 'Slider.Thumb';
