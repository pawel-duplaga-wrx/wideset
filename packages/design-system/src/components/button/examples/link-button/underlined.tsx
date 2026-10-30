/** Off by default, since a link button usually stands on its own. Turn the underline on when the link sits inside a sentence, where colour alone does not tell it apart from the text around it. */
import { LinkButton } from '@wideset/react';

export default function LinkButtonUnderlined() {
  return (
    <div className="gap-ws-12 flex flex-wrap items-center">
      <LinkButton href="#invoices">View invoice</LinkButton>
      <LinkButton href="#invoices" underlined>
        View invoice
      </LinkButton>
    </div>
  );
}
