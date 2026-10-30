/** The playground's stage: a short invoice table with a header row, three rows and a total. */
import { Table, type TableProps } from '@wideset/react';

export default function TableDefault(props: TableProps) {
  return (
    <div className="w-[26rem] max-w-full">
      <Table {...props}>
        <Table.Head>
          <Table.Row>
            <Table.Header>Customer</Table.Header>
            <Table.Header>Due</Table.Header>
            <Table.Header align="right">Amount</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Acme Corp</Table.Cell>
            <Table.Cell>Oct 2</Table.Cell>
            <Table.Cell align="right">$1,200.00</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Globex</Table.Cell>
            <Table.Cell>Oct 9</Table.Cell>
            <Table.Cell align="right">$860.50</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Initech</Table.Cell>
            <Table.Cell>Oct 14</Table.Cell>
            <Table.Cell align="right">$2,410.00</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Foot>
          <Table.Row>
            <Table.Cell>Total</Table.Cell>
            <Table.Cell />
            <Table.Cell align="right">$4,470.50</Table.Cell>
          </Table.Row>
        </Table.Foot>
      </Table>
    </div>
  );
}
