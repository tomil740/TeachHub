import { useState } from "react";

function UserInfo({ isEditing, onEdit, user, flex }) {
  const cultureOptions = ["Arab", "Jewish"];
  const languageOptions = ["Arabic", "Hebrew", "English"];
  const academicInstitutionOptions = [
    "Technion",
    "Tel Aviv University",
    "Hebrew University of Jerusalem",
    "Bar-Ilan University",
    "Ben-Gurion University of the Negev",
    "University of Haifa",
    "Weizmann Institute of Science",
    "Open University of Israel",
    "Ariel University",
    "Reichman University",
  ];

  const yearsOfExperience = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // State for feedback message

  function onlanguagePick(value) {
    const currentState = [...(user.language || [])]; // Ensure user.language is an array

    if (!currentState.includes(value)) {
      currentState.push(value);
    } else {
      const indexToRemove = currentState.indexOf(value);
      if (indexToRemove !== -1) {
        currentState.splice(indexToRemove, 1);
      }
    }

    onEdit("language", currentState);
  }

  return (
    <div className={`flex flex-col gap-4 rounded-lg border p-4 ${flex}`}>
      <h3 className="font-bold md:text-lg">User Information</h3>
      <div className="flex flex-wrap gap-4">
        {/* Culture */}
        <div>
          <span className="mr-2 font-bold text-blue-500">Culture:</span>
          {isEditing ? (
            <select
              value={user.religion || ""}
              onChange={(e) => onEdit("religion", e.target.value)}
              className="w-40 overflow-hidden rounded border"
            >
              {cultureOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <span>{user.religion || "Not specified"}</span>
          )}
        </div>

        {/* Language */}
        <div>
          <span className="mr-2 font-bold text-blue-500">Language:</span>
          {isEditing ? (
            <select
              value=""
              onChange={(e) => {
                const selectedLanguage = e.target.value;
                onlanguagePick(selectedLanguage);
              }}
              className="w-40 overflow-hidden rounded border"
            >
              <option value="" disabled>
                Select a language
              </option>
              {languageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <span>{(user.language || []).join(", ") || "Not specified"}</span>
          )}
        </div>

        {/* University */}
        <div>
          <span className="mr-2 font-bold text-blue-500">University:</span>
          {isEditing ? (
            <select
              value={user.education || ""}
              onChange={(e) => onEdit("education", e.target.value)}
              className="w-40 overflow-hidden rounded border"
            >
              {academicInstitutionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <span>{user.education || "Not specified"}</span>
          )}
        </div>

        {/* Experience */}
        <div>
          <span className="mr-2 font-bold text-blue-500">Experience:</span>
          {isEditing ? (
            <select
              value={user.experience || ""}
              onChange={(e) => onEdit("experience", e.target.value)}
              className="w-40 overflow-hidden rounded border"
            >
              {yearsOfExperience.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <span>{user.experience || "Not specified"}</span>
          )}
        </div>

        {/* DOB */}
        <div>
          <span className="mr-2 font-bold text-blue-500">Date Of Birth:</span>
          <span>{user.dob || "Not specified"}</span>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
