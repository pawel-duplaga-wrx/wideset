/** The playground's stage: one search field with an icon inside, its props set from the rail. */
import { RiSearchLine } from '@remixicon/react';
import { TextInput, type TextInputProps } from '@wideset/react';

export default function TextInputDefault(props: TextInputProps) {
  return (
    <div className="w-[20rem] max-w-full">
      <TextInput {...props}>
        <TextInput.Prefix inner>
          <TextInput.Icon icon={RiSearchLine} />
        </TextInput.Prefix>
        <TextInput.Input placeholder="Search projects" />
      </TextInput>
    </div>
  );
}
