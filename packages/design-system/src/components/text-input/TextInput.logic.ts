/**
 * Sets an input's value the way typing does: through the native setter, then a
 * bubbling `input` event. React's change tracking sees a real edit, so `onChange`
 * fires with the element as `event.target`, and native listeners fire too.
 */
export const setNativeInputValue = (input: HTMLInputElement, value: string) => {
  const view = input.ownerDocument.defaultView ?? window;
  const setValue = Object.getOwnPropertyDescriptor(view.HTMLInputElement.prototype, 'value')?.set;
  setValue?.call(input, value);
  input.dispatchEvent(new view.Event('input', { bubbles: true }));
};
