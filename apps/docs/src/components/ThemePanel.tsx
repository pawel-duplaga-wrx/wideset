import { useEffect, useState } from 'react';

import { applyRadius, commitRadius, loadRadius, onRadiusChange, type Radius } from '../lib/radius';
import {
  type Appearance,
  commitAppearance,
  loadAppearance,
  onAppearanceChange,
} from '../lib/theme';
import { ControlRow, Pick, RailPanel } from './railControls';

/**
 * The page-wide knobs. Theme flips the design system's `.dark` class, Radius re-maps the
 * corner tokens so every control on the page follows. Size, Icons and Primitive have one
 * option each (Wideset ships one icon set and one primitive layer) and sit in the same
 * select as the rows above them, so the panel reads as one instrument.
 */
const ThemePanel = () => {
  const [appearance, setAppearance] = useState<Appearance>('system');
  const [radius, setRadius] = useState<Radius>('default');

  useEffect(() => {
    setAppearance(loadAppearance());
    const saved = loadRadius();
    setRadius(saved);
    applyRadius(saved);
    const offAppearance = onAppearanceChange(setAppearance);
    const offRadius = onRadiusChange(setRadius);
    return () => {
      offAppearance();
      offRadius();
    };
  }, []);

  return (
    <RailPanel>
      <ControlRow label="Theme">
        <Pick
          value={appearance}
          options={[
            { label: 'System', value: 'system' },
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
          ]}
          onChange={(value) => {
            setAppearance(value);
            commitAppearance(value);
          }}
        />
      </ControlRow>
      <ControlRow label="Radius">
        <Pick
          value={radius}
          options={[
            { label: 'Sharp', value: 'sharp' },
            { label: 'Rounded', value: 'default' },
            { label: 'Round', value: 'round' },
          ]}
          onChange={(value) => {
            setRadius(value);
            commitRadius(value);
          }}
        />
      </ControlRow>
      <ControlRow label="Size">
        <Pick
          value="default"
          options={[{ label: 'Default', value: 'default' }]}
          onChange={() => undefined}
        />
      </ControlRow>
      <ControlRow label="Icons">
        <Pick
          value="remix"
          options={[{ label: 'Remix', value: 'remix' }]}
          onChange={() => undefined}
        />
      </ControlRow>
      <ControlRow label="Primitive">
        <Pick
          value="radix"
          options={[{ label: 'Radix', value: 'radix' }]}
          onChange={() => undefined}
        />
      </ControlRow>
    </RailPanel>
  );
};

export default ThemePanel;
