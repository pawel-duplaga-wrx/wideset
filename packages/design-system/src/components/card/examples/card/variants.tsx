/**
 * Bordered draws its own surface, for cards that sit directly on the page background or need to
 * read as separate items. Flat drops the border and lets the parent layout do the grouping, for
 * cards inside a panel or a section that already has a frame. Keep one variant per group of
 * cards.
 */
import { Card } from '@wideset/react';

export default function CardVariants() {
  return (
    <div className="gap-ws-11 grid w-full grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]">
      {(['bordered', 'flat'] as const).map((variant) => (
        <Card key={variant} variant={variant}>
          <Card.Header>
            <Card.Title>Monthly revenue</Card.Title>
            <Card.Description>Updated every night at 2:00.</Card.Description>
          </Card.Header>
          <Card.Content>
            <p className="typography-body-md text-ws-static-subtle">
              Revenue grew 12% against last month, driven by annual plans.
            </p>
          </Card.Content>
        </Card>
      ))}
    </div>
  );
}
