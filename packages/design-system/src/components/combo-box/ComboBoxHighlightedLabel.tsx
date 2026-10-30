import type { ComboBoxHighlightedLabelProps } from './ComboBox.types';

const ComboBoxHighlightedLabel = ({ label, search }: ComboBoxHighlightedLabelProps) => {
  if (!search) return label;

  const index = label.toLowerCase().indexOf(search.toLowerCase());

  if (index === -1) return label;

  return (
    <>
      {label.slice(0, index)}
      <span className="text-ws-dynamic-primary-default">
        {label.slice(index, index + search.length)}
      </span>
      {label.slice(index + search.length)}
    </>
  );
};

ComboBoxHighlightedLabel.displayName = 'ComboBoxHighlightedLabel';

export { ComboBoxHighlightedLabel };
