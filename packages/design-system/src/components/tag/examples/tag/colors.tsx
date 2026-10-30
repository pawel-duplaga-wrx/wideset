/**
 * Tag colours are categorical, not semantic: they tell categories apart (a project, a team, a
 * topic) and say nothing about success or danger, which is Status badge's job. Give each
 * category one colour and keep it everywhere; secondary is the neutral fallback.
 */
import { Tag } from '@wideset/react';

const tags = [
  ['brand', 'Wideset'],
  ['red', 'Marketing'],
  ['pink', 'Brand'],
  ['violet', 'Research'],
  ['purple', 'Design'],
  ['indigo', 'Platform'],
  ['blue', 'Engineering'],
  ['cyan', 'Data'],
  ['teal', 'Support'],
  ['green', 'Finance'],
  ['lime', 'Growth'],
  ['yellow', 'Legal'],
  ['orange', 'Sales'],
  ['secondary', 'Other'],
] as const;

export default function TagColors() {
  return (
    <div className="gap-ws-8 flex flex-wrap items-center">
      {tags.map(([color, label]) => (
        <Tag key={color} color={color}>
          {label}
        </Tag>
      ))}
    </div>
  );
}
