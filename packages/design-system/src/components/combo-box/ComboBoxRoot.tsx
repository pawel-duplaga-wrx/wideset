import { useDefaultMotion } from '../../motion/MotionProvider';
import { Popup } from '../popup/Popup';
import { ComboBoxContext, useCreateComboBoxContextValue } from './ComboBox.context';
import type { ComboBoxRootProps } from './ComboBox.types';

const ComboBoxRoot = ({
  children,
  options,
  value,
  defaultValue,
  clearable,
  disallowCustomValue,
  disabled,
  onChange,
  onClear,
  defaultMotion,
  ...popupProps
}: ComboBoxRootProps) => {
  const motion = useDefaultMotion(defaultMotion);
  const contextValue = useCreateComboBoxContextValue({
    ...popupProps,
    options,
    value,
    defaultValue,
    clearable,
    disallowCustomValue,
    disabled,
    onChange,
    onClear,
  });

  return (
    <ComboBoxContext.Provider value={{ ...contextValue, motion }}>
      <Popup {...popupProps} open={contextValue.open} onOpenChange={contextValue.onOpenChange}>
        {children}
      </Popup>
    </ComboBoxContext.Provider>
  );
};

ComboBoxRoot.displayName = 'ComboBoxRoot';

export { ComboBoxRoot };
