import { FC, ReactNode, useState } from 'react';

export type dropDownOptions = { label: string; onMouseDown: () => void }[];

interface IProps {
  options: dropDownOptions;
  head: ReactNode;
}

const DropdownOptions: FC<IProps> = ({ options, head }) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <button
      className="relative"
      onMouseDown={() => setShowOptions(!showOptions)}
      onBlur={() => setShowOptions(false)}
    >
      {head}
      {showOptions && (
        <div className="min-w-max absolute top-full mt-4 right-2 z-10 border-2 border-primary-dark dark:border-primary rounded text-left bg-primary dark:bg-primary-dark">
          <ul className="p-3 space-y-3">
            {Array.isArray(options) &&
              options?.length > 0 &&
              options.map(({ label, onMouseDown }, index) => {
                return (
                  <li key={label + index} onMouseDown={onMouseDown}>
                    {label}
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </button>
  );
};

export default DropdownOptions;
