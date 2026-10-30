import * as React from 'react';

type PopupContainerContextValue = {
  setTitleId: (id: string | undefined) => void;
  setDescriptionId: (id: string | undefined) => void;
};

export const PopupContainerContext = React.createContext<PopupContainerContextValue | undefined>(
  undefined,
);

export const usePopupLabelId = (kind: 'title' | 'description', idProp: string | undefined) => {
  const generatedId = React.useId();
  const id = idProp ?? generatedId;
  const context = React.useContext(PopupContainerContext);
  const register = kind === 'title' ? context?.setTitleId : context?.setDescriptionId;

  React.useLayoutEffect(() => {
    if (!register) return;
    register(id);
    return () => register(undefined);
  }, [register, id]);

  return id;
};
