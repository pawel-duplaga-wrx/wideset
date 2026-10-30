export const setNativeInputValue = (input: HTMLInputElement, value: string) => {
  const view = input.ownerDocument.defaultView ?? window;
  const setValue = Object.getOwnPropertyDescriptor(view.HTMLInputElement.prototype, 'value')?.set;
  setValue?.call(input, value);
  input.dispatchEvent(new view.Event('input', { bubbles: true }));
};
