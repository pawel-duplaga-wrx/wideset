/**
 * `striped` shades every other row, so the eye can follow a long row across many columns
 * without losing its place. Use it for wide tables of similar-looking values; short tables read
 * fine with the row lines alone.
 */
import { Table } from '@wideset/react';

const rows = [
  ['Redesign website', 'In progress', 'May 30', 'Anna Kowalska'],
  ['Launch mobile app', 'Done', 'Jun 15', 'Marek Nowak'],
  ['Brand refresh', 'Planned', 'Jul 1', 'Ola Wiśniewska'],
  ['Pricing page', 'In progress', 'Jul 12', 'Piotr Zieliński'],
];

export default function TableStriped() {
  return (
    <div className="w-[34rem] max-w-full">
      <Table striped>
        <Table.Head>
          <Table.Row>
            <Table.Header>Project</Table.Header>
            <Table.Header>Status</Table.Header>
            <Table.Header>Deadline</Table.Header>
            <Table.Header>Owner</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {rows.map(([project, status, deadline, owner]) => (
            <Table.Row key={project}>
              <Table.Cell>{project}</Table.Cell>
              <Table.Cell>{status}</Table.Cell>
              <Table.Cell>{deadline}</Table.Cell>
              <Table.Cell>{owner}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
