/** The size sets the row height and the text size together. Small is the default and fits most data; medium and large give room to rows that hold avatars, buttons or two lines of text. */
import { Table } from '@wideset/react';

const sizes = ['sm', 'md', 'lg'] as const;
const names = { sm: 'Small', md: 'Medium', lg: 'Large' };

export default function TableSizes() {
  return (
    <div className="gap-ws-11 flex w-[26rem] max-w-full flex-col">
      {sizes.map((size) => (
        <Table key={size} size={size}>
          <Table.Head>
            <Table.Row>
              <Table.Header>{names[size]}</Table.Header>
              <Table.Header align="right">Amount</Table.Header>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Acme Corp</Table.Cell>
              <Table.Cell align="right">$1,200.00</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      ))}
    </div>
  );
}
