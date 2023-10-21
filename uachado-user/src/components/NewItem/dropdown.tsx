import React, { useState } from "react";

const items = ["Country 1", "Country 2", "Country 3", "Another Country"]; // Replace with your list of countries

function Dropdown() {
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setSearchText(inputValue);

    // Filter the items based on the input value
    const filtered = items.filter((item) =>
      item.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleItemClick = (item: string) => {
    setSearchText(item);
    setIsOpen(false);
  };

  return (
    <div className="dropdown w-full">
      <input
        className="input input-bordered w-full bg-primary placeholder-black"
        placeholder="Tipo de Objeto"
        onClick={() => setIsOpen(true)}
        value={searchText}
        onChange={handleInputChange}
      />
      {isOpen && filteredItems.length > 0 && (
        <ul className="dropdown-content z-10 menu p-2 shadow bg-primary border-secondary rounded-box w-52 max-h-80 flex-nowrap overflow-auto">
          {filteredItems.map((item, index) => (
            <li key={index} onClick={() => handleItemClick(item)}>
              <a>{item}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
