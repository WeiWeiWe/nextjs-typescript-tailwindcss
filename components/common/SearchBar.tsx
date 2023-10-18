import { FC } from 'react';

interface IProps {}

const SearchBar: FC<IProps> = () => {
  return (
    <input
      type="text"
      placeholder="search..."
      className="border-2 bg-transparent border-secondary-dark p-2 text-primary-dark dark:text-primary rounded focus:border-primary-dark dark:focus:border-primary outline-none transition"
    />
  );
};

export default SearchBar;
