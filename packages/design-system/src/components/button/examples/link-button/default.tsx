/** The playground's stage: one link button, its props set from the rail. */
import { LinkButton, type LinkButtonProps } from '@wideset/react';

export default function LinkButtonDefault(props: LinkButtonProps) {
  return (
    <LinkButton href="#invoices" {...props}>
      View invoice
    </LinkButton>
  );
}
