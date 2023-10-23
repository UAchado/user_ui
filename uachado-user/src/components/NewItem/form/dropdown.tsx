import React, { useState } from "react";


function Dropdown({ items }: { items: string[] }) {
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState<string[]>(items);

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
    <div className="dropdown w-full mt-7">
      <input
        className="input input-bordered border-primary w-full bg-secondary placeholder-black"
        placeholder="Tipo de Objeto"
        onClick={() => setIsOpen(true)}
        value={searchText}
        name="tag"
        onChange={handleInputChange}
        tabIndex={10}
        required
      />
      {isOpen && filteredItems.length > 0 && (
        <ul
          className="dropdown-content z-10 menu p-2 shadow bg-primary bordered border-secondary rounded-box w-52 max-h-80 flex-nowrap overflow-auto"
        >
          {filteredItems.map((item, index) => (
            <li key={index} onClick={() => handleItemClick(item)}>
              <button>{item}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
