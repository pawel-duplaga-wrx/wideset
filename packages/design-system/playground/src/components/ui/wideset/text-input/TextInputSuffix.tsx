'use client';

import { TextInputInfo, type TextInputInfoProps } from './TextInputInfo';

export type TextInputSuffixProps = Omit<TextInputInfoProps, 'position'>;

export const TextInputSuffix = (props: TextInputSuffixProps) => {
  return <TextInputInfo data-slot="text-input-suffix" position="suffix" {...props} />;
};

TextInputSuffix.displayName = 'TextInput.Suffix';
