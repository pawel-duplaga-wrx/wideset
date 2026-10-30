/** `Card.Media` holds its aspect ratio (16/9 unless you pass `ratio`) before the image loads, so the cards in a grid line up and the page does not jump. In a bordered card it runs to the edges; in a flat one it gets rounded corners. Give the image `alt` text unless the title already says what it shows. */
import { Card } from '@wideset/react';

const PHOTO =
  'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=480&h=270&dpr=2&q=80';

export default function CardMedia() {
  return (
    <div className="gap-ws-11 grid w-full grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]">
      {(['bordered', 'flat'] as const).map((variant) => (
        <Card key={variant} variant={variant}>
          <Card.Media>
            <img src={PHOTO} alt="" className="size-full object-cover" />
          </Card.Media>
          <Card.Header>
            <Card.Title>Spring campaign</Card.Title>
            <Card.Description>Portraits for the new landing page.</Card.Description>
          </Card.Header>
        </Card>
      ))}
    </div>
  );
}
