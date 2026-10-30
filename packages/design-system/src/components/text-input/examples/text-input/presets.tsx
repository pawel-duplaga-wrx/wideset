/**
 * Border draws the field's own frame, for fields placed straight on the page or in a form. Ghost
 * drops the frame until hover and focus, for a field that sits inside a surface that already has
 * one, such as a toolbar or a table header.
 */
import { TextInput } from '@wideset/react';

export default function TextInputPresets() {
  return (
    <div className="gap-ws-12 flex w-[20rem] max-w-full flex-col">
      <TextInput preset="border" placeholder="Project name" aria-label="Project name" />
      <TextInput preset="ghost" placeholder="Project name" aria-label="Project name" />
    </div>
  );
}
