import { LinkButton } from '@wideset/react';

import { PLAYGROUNDS, resetValues, setValues, useValues, withPlayground } from '../lib/playground';
import { ControlRow, Pick, RailPanel, Toggle } from './railControls';

/**
 * "Properties" in the right rail: the controls come from the component's playground
 * definition, so adding a control there is the whole job.
 */
const PropertiesPanel = ({ component }: { component: string }) => {
  const definition = PLAYGROUNDS[component];
  const values = useValues(component);
  const changed = Object.keys(definition.defaults).some(
    (key) => values[key] !== definition.defaults[key],
  );
  // An overlay or a compound with nothing to switch has no panel, not an empty one.
  if (!definition.groups.length) return null;

  return (
    <RailPanel
      title="Properties"
      action={
        changed ? (
          <LinkButton size="sm" variant="secondary" onClick={() => resetValues(component)}>
            Reset
          </LinkButton>
        ) : null
      }
    >
      {definition.groups.map((group) =>
        group.controls.map((control) => (
          <ControlRow key={control.key} label={control.label}>
            {control.type === 'switch' ? (
              <Toggle
                checked={Boolean(values[control.key])}
                label={control.label}
                onChange={(value) => setValues(component, { [control.key]: value })}
              />
            ) : (
              <Pick
                value={String(values[control.key])}
                options={control.options}
                onChange={(value) => setValues(component, { [control.key]: value })}
              />
            )}
          </ControlRow>
        )),
      )}
    </RailPanel>
  );
};

export default withPlayground(PropertiesPanel);
