import {
  RiArrowDownSLine,
  RiCheckLine,
  RiClaudeFill,
  RiFileCopyLine,
  RiHeartLine,
  RiMarkdownLine,
  RiOpenaiFill,
  RiSparkling2Line,
} from '@remixicon/react';
import { Button, DropdownMenu, ListItem } from '@wideset/react';
import { useState } from 'react';

/** Where "Open in …" sends the prompt, as each tool reads it from the URL. */
const OPEN_IN = [
  { label: 'Open in v0', Icon: RiSparkling2Line, url: (q: string) => `https://v0.dev/?q=${q}` },
  {
    label: 'Open in Lovable',
    Icon: RiHeartLine,
    url: (q: string) => `https://lovable.dev/#prompt=${q}`,
  },
  {
    label: 'Open in ChatGPT',
    Icon: RiOpenaiFill,
    url: (q: string) => `https://chatgpt.com/?prompt=${q}`,
  },
  {
    label: 'Open in Claude',
    Icon: RiClaudeFill,
    url: (q: string) => `https://claude.ai/new?q=${q}`,
  },
];

/** The prompt names this page and its Markdown twin, read at click time from the address bar. */
const prompt = () => {
  const page = `${location.origin}${location.pathname.replace(/\/$/, '')}`;
  return encodeURIComponent(
    [
      `I'm building with Wideset, a React design system, and want to use the component documented here: ${page}`,
      `Read its Markdown version first (${page}.md): it has the install line, the parts, examples and every prop.`,
      'Then answer my questions about it and write code that uses it the way the docs show.',
    ].join('\n'),
  );
};

const Row = ({
  label,
  icon: Icon,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) => (
  <>
    <ListItem.Prefix>
      <Icon className="size-ws-9" />
    </ListItem.Prefix>
    <ListItem.Content>
      <ListItem.Label>{label}</ListItem.Label>
    </ListItem.Content>
  </>
);

/**
 * The page's Copy menu, after the header links and drawn like them: the page as Markdown
 * (open it, copy it) or handed to a model with a prompt that points at it.
 */
const CopyMenu = ({ markdown, className }: { markdown: string; className: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  const open = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');
  const page = () => location.pathname.replace(/\/$/, '');

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        {/* The system's Button, re-dressed as the header links beside it: no fill, no shadow. */}
        <Button
          size="xs"
          preset="border"
          variant="secondary"
          className={`${className} bg-transparent shadow-none`}
        >
          {copied ? (
            <RiCheckLine className="size-ws-8" aria-hidden="true" />
          ) : (
            <RiFileCopyLine className="size-ws-8" aria-hidden="true" />
          )}
          {/* Both labels share one grid cell, so the button is as wide as "Copied" from the start. */}
          <span className="grid justify-items-start text-left">
            <span className={`col-start-1 row-start-1 ${copied ? 'invisible' : ''}`}>Copy</span>
            <span className={`col-start-1 row-start-1 ${copied ? '' : 'invisible'}`}>Copied</span>
          </span>
          <RiArrowDownSLine className="-mr-ws-3 size-ws-8" aria-hidden="true" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        <DropdownMenu.Item onSelect={() => open(`${page()}.md`)}>
          <Row label="View as Markdown" icon={RiMarkdownLine} />
        </DropdownMenu.Item>
        <DropdownMenu.Item onSelect={copy}>
          <Row label="Copy as Markdown" icon={RiFileCopyLine} />
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        {OPEN_IN.map((item) => (
          <DropdownMenu.Item key={item.label} onSelect={() => open(item.url(prompt()))}>
            <Row label={item.label} icon={item.Icon} />
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};

export default CopyMenu;
