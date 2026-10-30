import { RiAddLine, RiCheckLine, RiSettings3Line, RiUserLine } from '@remixicon/react';
import { useState } from 'react';

import { Button } from '@/components/ui/wideset/button/Button';
import { IconButton } from '@/components/ui/wideset/button/IconButton';
import { Checkbox } from '@/components/ui/wideset/checkbox/Checkbox';
import { Modal } from '@/components/ui/wideset/modal/Modal';
import { Select } from '@/components/ui/wideset/select/Select';
import { Switch } from '@/components/ui/wideset/switch/Switch';
import { Tabs } from '@/components/ui/wideset/tabs/Tabs';
import { Tag } from '@/components/ui/wideset/tag/Tag';
import { TextInput } from '@/components/ui/wideset/text-input/TextInput';

const countries = [
  { label: 'Poland', value: 'poland' },
  { label: 'USA', value: 'usa' },
  { label: 'Germany', value: 'germany' },
  { label: 'Canada', value: 'canada', disabled: true },
];

export function App() {
  const [open, setOpen] = useState(false);

  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-ws-12 p-ws-16">
      <h1 className="typography-heading-lg">Wideset scaffolded with shadcn</h1>

      <section className="flex flex-wrap items-center gap-ws-4">
        <Button>
          <Button.Icon icon={RiCheckLine} />
          Primary
        </Button>
        <Button variant="secondary" preset="border">
          Secondary
        </Button>
        <Button variant="danger">Danger</Button>
        <IconButton aria-label="Settings" icon={RiSettings3Line} />
        <Tag>Tag</Tag>
        <Tag color="green" preset="border">
          Success
        </Tag>
      </section>

      <section className="flex max-w-xs flex-col gap-ws-6">
        <TextInput placeholder="Your name" />
        <Select options={countries} placeholder="Pick a country" />
        <Checkbox defaultChecked>
          <Checkbox.Label>Send me updates</Checkbox.Label>
        </Checkbox>
        <Switch label="Dark mode" />
      </section>

      <Tabs defaultValue="one">
        <Tabs.List>
          <Tabs.Item value="one">
            <Tabs.Icon icon={RiUserLine} />
            <Tabs.Label>Profile</Tabs.Label>
            <Tabs.Count>2</Tabs.Count>
          </Tabs.Item>
          <Tabs.Item value="two">
            <Tabs.Label>Settings</Tabs.Label>
          </Tabs.Item>
        </Tabs.List>
        <Tabs.Content value="one" className="py-ws-8">
          Profile content
        </Tabs.Content>
        <Tabs.Content value="two" className="py-ws-8">
          Settings content
        </Tabs.Content>
      </Tabs>

      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Trigger asChild>
          <Button variant="secondary" preset="border">
            <Button.Icon icon={RiAddLine} />
            Open modal
          </Button>
        </Modal.Trigger>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Scaffolded modal</Modal.Title>
            <Modal.Description>This code lives in src/components/ui/wideset, edit it freely.</Modal.Description>
          </Modal.Header>
          <Modal.Body>Content here</Modal.Body>
          <Modal.Footer>
            <Modal.Close asChild>
              <Button variant="secondary" preset="border">
                Cancel
              </Button>
            </Modal.Close>
            <Modal.Close asChild>
              <Button>Confirm</Button>
            </Modal.Close>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </main>
  );
}
