import React from "react";
import { Search } from "react-feather";
import Btn from "ui-lib/Btn";
import Input from "ui-lib/Input";

interface ISearchBoxProps {
  searchTerm?: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

const SearchBox: React.FC<ISearchBoxProps> = ({
  searchTerm,
  onSearchChange,
  onSubmit,
}) => {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit?.(e);
  }
  return (
    <form className="flex space-x-4" onSubmit={handleSubmit}>
      <Input
        name="searchTerm"
        value={searchTerm}
        className="text-lg text-gray-800 py-2 px-4"
        onChange={onSearchChange}
      />
      <Btn
        type="submit"
        disabled={!searchTerm}
        size="custom"
        className="w-12 h-12 flex-none"
      >
        <Search />
      </Btn>
    </form>
  );
};
export default SearchBox;
