import { useState } from "react";

function AttributeContainer({ isEditing, onEdit, user, listKey, options }) {
  // Ensure user[listKey] is always an array
  const availableOptions = options.filter(
    (option) => !(user[listKey] || []).includes(option), // Fallback to empty array if undefined
  );

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleAddItem = (newItem) => {
    onEdit(listKey, [...(user[listKey] || []), newItem]); // Ensure user[listKey] is an array
    setDropdownVisible(false); // Close the dropdown after adding
  };

  const handleRemoveItem = (itemToRemove) => {
    onEdit(
      listKey,
      (user[listKey] || []).filter((item) => item !== itemToRemove), // Ensure user[listKey] is an array
    );
  };

  return (
    <div className="rounded border p-4">
      <div id="attribute-container-list" className="flex justify-center gap-4">
        {/* Selected Items */}
        {(user[listKey] || []).map((item, index) => (
          <div
            key={index}
            id="attribute-container-item"
            className="flex min-w-[150px] items-center gap-2 whitespace-nowrap rounded-lg bg-blue-100 p-2 px-4 text-base text-blue-700 shadow-sm"
          >
            <span>{item}</span>
            {isEditing && (
              <button
                className="cursor-pointer text-red-500 transition-all duration-300 hover:text-red-600"
                onClick={() => handleRemoveItem(item)}
              >
                ✖
              </button>
            )}
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="flex items-center gap-2">
          <button
            className="rounded bg-blue-500 px-4 py-1 text-white transition-all duration-300 hover:bg-blue-600"
            onClick={() => setDropdownVisible(!dropdownVisible)}
          >
            Add {listKey}
          </button>

          {dropdownVisible && (
            <select
              className="absolute z-10 mt-2 rounded-lg border border-gray-300 bg-white p-2 text-base text-gray-800 shadow-md"
              onChange={(e) => {
                handleAddItem(e.target.value);
                e.target.value = ""; // Reset dropdown
              }}
            >
              <option value="" disabled selected>
                Select an option
              </option>
              {availableOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
    </div>
  );
}

export default AttributeContainer;
