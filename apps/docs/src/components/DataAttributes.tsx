import { useEffect, useState } from 'react';

type Found = { name: string; values: string[] };

/**
 * What each attribute is for, as a stylesheet uses it. The attributes come from the system's
 * own parts (`data-slot`) and from Radix, which sets the same few across components.
 */
const Code = ({ children }: { children: string }) => (
  <code className="rounded-ws-control-md bg-ws-static-alpha-subtle px-ws-3 py-ws-2 font-mono typography-body-sm text-ws-static-strong">
    {children}
  </code>
);

const PURPOSE: Record<string, React.ReactNode> = {
  'data-slot': (
    <>
      Marks which part this is (<Code>button</Code>, <Code>button-icon</Code>). Use it to target a
      part from outside: parent selectors, tests, tooling. To style a part directly, pass{' '}
      <Code>className</Code>.
    </>
  ),
  'data-state':
    'The part’s current state, such as open, closed, checked, active or on. Style each state.',
  'data-disabled': 'Present while the part is disabled.',
  'data-orientation': 'Whether the part lays out horizontally or vertically.',
  'data-highlighted': 'Present on the item the pointer or keyboard is on.',
  'data-placeholder': 'Present while nothing is selected and the placeholder shows.',
  'data-side': 'The side of the trigger the floating content opened on.',
  'data-align': 'How the floating content is aligned to its trigger.',
  'data-swipe': 'The swipe gesture in progress on a toast.',
  'data-swipe-direction': 'The direction a toast can be swiped away in.',
  'data-motion': 'Which way content animates when the active item changes.',
  'data-value': 'The value of the item.',
};

/**
 * The attributes on one part's elements. Parts are told apart by `data-slot`; on a component
 * whose parts carry none yet, everything is shown under its root part.
 */
const read = (stage: Element, slot: string, root: boolean): Found[] => {
  const all = [...stage.querySelectorAll('*')];
  const marked = all.some((el) => el.hasAttribute('data-slot'));
  const elements = marked
    ? all.filter((el) => el.getAttribute('data-slot') === slot)
    : root
      ? all
      : [];
  const byName = new Map<string, Set<string>>();
  for (const el of elements) {
    for (const attr of el.attributes) {
      // Radix's own bookkeeping (`data-radix-collection-item`) is not for styling.
      if (!attr.name.startsWith('data-') || attr.name.startsWith('data-radix-')) continue;
      if (!byName.has(attr.name)) byName.set(attr.name, new Set());
      if (attr.value) byName.get(attr.name)!.add(attr.value);
    }
  }
  return [...byName].map(([name, values]) => ({ name, values: [...values] }));
};

const HEAD = 'px-ws-9 py-ws-6 text-left typography-caption-strong-md text-ws-static-subtle';

/**
 * The `data-*` attributes one part puts on the DOM, read live off the playground stage, drawn
 * inside that part's props box: what a stylesheet can target (`[data-state=open]`,
 * `[data-slot=button-icon]`). One row per attribute with every value it has right now; turn
 * a control in the rail and the list follows.
 */
const DataAttributes = ({ slot, root, part }: { slot: string; root: boolean; part: string }) => {
  const [found, setFound] = useState<Found[] | null>(null);

  useEffect(() => {
    // The stage is found afresh on every change: switching the playground's tabs unmounts
    // it and mounts a new one, so holding on to the first element would go stale.
    const update = () => {
      const stage = document.querySelector('[data-playground-stage]');
      if (stage) setFound(read(stage, slot, root));
    };
    update();
    const playground = document.getElementById('playground') ?? document.body;
    const observer = new MutationObserver(update);
    observer.observe(playground, { subtree: true, childList: true, attributes: true });
    return () => observer.disconnect();
  }, [slot, root]);

  if (found === null) return null;
  if (found.length === 0) return null;

  return (
    <div className="mt-ws-9 overflow-hidden rounded-ws-container-lg border border-ws-static-base">
      <div className="flex items-baseline gap-ws-5 border-b border-ws-static-base bg-ws-static-alpha-subtle px-ws-9 py-ws-6">
        <span className="typography-label-strong-sm text-ws-static-strong">Data attributes</span>
        <span className="typography-body-sm text-ws-static-subtle">on {part}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse typography-body-md">
          <thead>
            <tr className="border-b border-ws-static-base">
              <th className={`${HEAD} w-[11rem]`}>Attribute</th>
              <th className={HEAD}>Description</th>
              <th className={`${HEAD} w-[7rem]`}>Value now</th>
            </tr>
          </thead>
          <tbody>
            {found.map((row) => (
              <tr key={row.name} className="border-b border-ws-static-base last:border-b-0">
                <td className="px-ws-9 py-ws-8 align-top font-mono typography-label-strong-sm text-ws-static-strong">
                  {row.name}
                </td>
                <td className="px-ws-9 py-ws-7 align-top leading-ws-500 text-ws-static-base">
                  {PURPOSE[row.name] ?? '—'}
                </td>
                <td className="px-ws-9 py-ws-7 align-top">
                  {row.values.length ? (
                    <div className="flex flex-wrap gap-ws-3">
                      {row.values.map((value) => (
                        <code
                          key={value}
                          className="rounded-ws-control-md bg-ws-static-alpha-subtle px-ws-4 py-ws-2 font-mono typography-body-sm text-ws-static-base"
                        >
                          {value}
                        </code>
                      ))}
                    </div>
                  ) : (
                    <span className="typography-body-sm text-ws-static-subtle">present</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataAttributes;
