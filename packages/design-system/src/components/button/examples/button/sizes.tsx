/**
 * Medium is the default. Extra small and small fit toolbars, table rows and other compact
 * layouts; large gives a page's main call to action more presence and a bigger hit area. Buttons
 * that sit side by side share one size.
 */
import { Button } from '@wideset/react';

export default function ButtonSizes() {
  return (
    <div className="gap-ws-12 flex flex-wrap items-center">
      {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
        <Button key={size} size={size}>
          Save changes
        </Button>
      ))}
    </div>
  );
}
