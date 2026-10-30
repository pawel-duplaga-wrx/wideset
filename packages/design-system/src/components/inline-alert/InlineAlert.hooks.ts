import { useCallback, useRef } from 'react';

import type { InlineAlertOutletHandle, InlineAlertShowConfig } from './InlineAlert.types';

export const useInlineAlert = () => {
  const ref = useRef<InlineAlertOutletHandle>(null);

  const showInlineAlert = useCallback(
    (config: InlineAlertShowConfig) => ref.current?.show(config) ?? '',
    [],
  );

  const dismissInlineAlert = useCallback((id: string) => ref.current?.dismiss(id), []);

  const dismissAllInlineAlerts = useCallback(() => ref.current?.dismissAll(), []);

  return { ref, showInlineAlert, dismissInlineAlert, dismissAllInlineAlerts };
};
