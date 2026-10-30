/** The playground's stage: one switch, on, with its label, its props set from the rail. */
import { Switch, type SwitchProps } from '@wideset/react';

export default function SwitchDefault(props: SwitchProps) {
  return (
    <Switch defaultChecked {...props}>
      <Switch.Label>Email notifications</Switch.Label>
    </Switch>
  );
}
