/** Row hover is live with `interactive`; `selectionMode` turns it on too, makes the table a `grid` and sets `aria-selected` on each row, while the selection itself stays your state. A sortable header gets a sort button and `aria-sort`; `disabled` on the header locks the button. */
import { Checkbox, Table } from '@wideset/react';
import { useState } from 'react';

const rows = [
  { id: 1, name: 'Redesign website', deadline: 'May 30' },
  { id: 2, name: 'Launch mobile app', deadline: 'Jun 15' },
  { id: 3, name: 'Brand refresh', deadline: 'Jul 1' },
];

export default function TableStates() {
  const [selected, setSelected] = useState<number[]>([2]);
  const toggle = (id: number) =>
    setSelected((ids) => (ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]));

  return (
    <div className="w-[26rem] max-w-full">
      <Table selectionMode="multiple">
        <Table.Head>
          <Table.Row>
            <Table.Header className="w-[3rem]" />
            <Table.Header sortable sortDirection="asc">
              Project
            </Table.Header>
            <Table.Header sortable disabled>
              Deadline
            </Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {rows.map((row) => (
            <Table.Row
              key={row.id}
              selected={selected.includes(row.id)}
              onClick={() => toggle(row.id)}
            >
              <Table.Cell>
                <Checkbox checked={selected.includes(row.id)} aria-label={`Select ${row.name}`} />
              </Table.Cell>
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.deadline}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
