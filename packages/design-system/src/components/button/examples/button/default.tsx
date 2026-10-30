/** The playground's stage: one button, its props set from the rail. */
import { Button, type ButtonProps } from '@wideset/react';

export default function ButtonDefault(props: ButtonProps) {
  return <Button {...props}>Continue</Button>;
}
