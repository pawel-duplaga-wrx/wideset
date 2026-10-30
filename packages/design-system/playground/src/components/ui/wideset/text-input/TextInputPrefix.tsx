'use client';

import { TextInputInfo, type TextInputInfoProps } from './TextInputInfo';

export type TextInputPrefixProps = Omit<TextInputInfoProps, 'position'>;

export const TextInputPrefix = (props: TextInputPrefixProps) => {
  return <TextInputInfo data-slot="text-input-prefix" position="prefix" {...props} />;
};

TextInputPrefix.displayName = 'TextInput.Prefix';
