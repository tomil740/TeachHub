import { useState } from "react";

function AttributeContainer({
  isEditing,
  onEdit,
  user,
  listKey,
  options,
  canEdit,
  defaultState,
}) {
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
    <div className="rounded-lg border p-4">
      <div className="flex flex-wrap justify-center gap-4">
        {/* Check if there are items in the list */}
        {(user[listKey] || []).length > 0 ? (
          (user[listKey] || []).map((item, index) => (
            <div
              key={index}
              id="attribute-container-item"
              className="flex items-center justify-center gap-4 rounded border bg-blue-500 px-4 py-1 text-white"
            >
              <span>{item}</span>
              {isEditing && (
                <button
                  className="h-4 w-4 cursor-pointer rounded bg-white font-bold leading-[0.7] text-blue-500"
                  onClick={() => handleRemoveItem(item)}
                >
                  x
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">{defaultState}</p>
        )}
      </div>

      {isEditing && (
        <div className="flex items-center gap-2">
          <button
            className="mt-4 rounded bg-blue-500 px-4 py-1 text-white transition-all duration-300 hover:bg-blue-600"
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
