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
    <div className="dropdown w-full mt-5">
    <input
      className="input input-bordered border-secondary w-full bg-primary placeholder-black"
      placeholder="Tipo de Objeto"
      onClick={() => setIsOpen(true)}
      value={searchText}
      name="tag"
      onChange={handleInputChange}
      tabIndex={10}
    />
    {isOpen && filteredItems.length > 0 && (
      <ul tabIndex={10} className="dropdown-content z-20 menu p-2 shadow bg-primary bordered border-secondary rounded-box w-52 max-h-80 flex-nowrap overflow-auto">
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
