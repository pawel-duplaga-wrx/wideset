/** Rows are always divided by a line. `separated` adds lines between the columns as well, for wide tables of numbers where the eye follows a column down rather than a row across. */
import { Table } from '@wideset/react';

const rows = [
  ['Acme Corp', '$1,200.00', '$300.00', '$900.00'],
  ['Globex', '$860.50', '$0.00', '$860.50'],
  ['Initech', '$2,410.00', '$410.00', '$2,000.00'],
];

export default function TableSeparated() {
  return (
    <div className="w-[30rem] max-w-full">
      <Table separated>
        <Table.Head>
          <Table.Row>
            <Table.Header>Customer</Table.Header>
            <Table.Header align="right">Billed</Table.Header>
            <Table.Header align="right">Paid</Table.Header>
            <Table.Header align="right">Due</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {rows.map(([customer, billed, paid, due]) => (
            <Table.Row key={customer}>
              <Table.Cell>{customer}</Table.Cell>
              <Table.Cell align="right">{billed}</Table.Cell>
              <Table.Cell align="right">{paid}</Table.Cell>
              <Table.Cell align="right">{due}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
