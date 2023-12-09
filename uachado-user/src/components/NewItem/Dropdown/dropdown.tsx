import React, { useState } from "react";

interface DropdownProps {
  items: string[];
  onSelect?: ((item: string) => void);
  className?: string;
}
const Dropdown: React.FC<DropdownProps> = ({ items, onSelect, className }) => {
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
    if (onSelect) {
      onSelect(item); // Only call onSelect if it's provided
    }
  };

  return (
      <div className={`w-full dropdown mt-7 ${className}`}>
      <input
        className="w-full placeholder-black input input-bordered bg-secondary shadow-lg"
        placeholder="Tipo de Objeto"
        onClick={() => setIsOpen(true)}
        value={searchText}
        name="tag"
        onChange={handleInputChange}
        tabIndex={10}
        autoComplete="off"
        required
      />
      {isOpen && filteredItems.length > 0 && (
        <ul
          className="z-10 p-2 overflow-auto shadow dropdown-content menu bg-secondary-focus bordered border-secondary rounded-box w-52 max-h-80 flex-nowrap"
        >
          {filteredItems.map((item, index) => (
            <li key={index}>
              <button onClick={() => handleItemClick(item)}>{item}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
