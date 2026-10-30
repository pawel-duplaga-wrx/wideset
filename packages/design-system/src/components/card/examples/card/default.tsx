/** The playground's stage: a card with a title, a status in the header and a short body, its props set from the rail. */
import { Card, type CardProps, StatusBadge } from '@wideset/react';

export default function CardDefault(props: CardProps) {
  return (
    <Card className="w-[20rem] max-w-full" {...props}>
      <Card.Header>
        <div className="gap-ws-9 flex items-start justify-between">
          <div className="flex min-w-0 flex-1 flex-col">
            <Card.Title>Weekly report</Card.Title>
            <Card.Description>Sent to the team every Monday.</Card.Description>
          </div>
          <Card.Action>
            <StatusBadge color="positive">Active</StatusBadge>
          </Card.Action>
        </div>
      </Card.Header>
      <Card.Content>
        <p className="typography-body-md text-ws-static-subtle">
          Covers sign-ups, churn and revenue for the last seven days.
        </p>
      </Card.Content>
    </Card>
  );
}
