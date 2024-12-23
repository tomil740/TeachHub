import { useState } from "react";

function UserInfo({ isEditing, onEdit, user }) {
  const cultureOptions = ["Arab", "Jewish"];
  const languageOptions = ["Arabic", "Hebrew", "English"];
  const cityOptions = ["Haifa", "SomeCity"];
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

  // State for feedback message
  const [feedback, setFeedback] = useState("");

  function onlanguagePick(value) {
    const currentState = [...(user.language || [])]; // Ensure user.language is an array
    let feedbackMessage = "";

    if (!currentState.includes(value)) {
      currentState.push(value);
      feedbackMessage = `✔️, value: ${currentState.join(", ")}`;
    } else {
      const indexToRemove = currentState.indexOf(value);
      if (indexToRemove !== -1) {
        currentState.splice(indexToRemove, 1);
        feedbackMessage = `❌, value: ${currentState.join(", ")}`;
      }
    }

    onEdit("language", currentState);
    setFeedback(feedbackMessage);
    setTimeout(() => setFeedback(""), 3000);
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl border p-4">
      <h3 className="text-lg font-bold text-red-500">User Information</h3>
      <div className="grid grid-cols-2 gap-4">
        {/* Culture */}
        <div className="FieldH">
          <span className="FieldH">Culture:</span>
          {isEditing ? (
            <select
              value={user.culture || ""}
              onChange={(e) => onEdit("culture", e.target.value)}
              className="relative inline-block w-full cursor-pointer border-none bg-transparent px-6 py-1 text-base font-normal text-black"
            >
              {cultureOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <span>{user.culture || "Not specified"}</span>
          )}
        </div>

        {/* Social Links */}
        <div className="FieldH">
          <span className="FieldH">Social Links:</span>
          {user.instagram && (
            <a href={user.instagram} target="_blank" rel="noreferrer">
              📸
            </a>
          )}
          {user.facebook && (
            <a href={user.facebook} target="_blank" rel="noreferrer">
              🔗
            </a>
          )}
        </div>

        {/* Language */}
        <div>
          <span className="FieldH">Language:</span>
          {isEditing ? (
            <select
              value=""
              onChange={(e) => {
                const selectedLanguage = e.target.value;
                console.log("seee", selectedLanguage);
                onlanguagePick(selectedLanguage);
              }}
              className="dropdown"
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

          {/* Feedback Message */}
          {feedback && (
            <div className="mt-2 w-max rounded bg-gray-200 px-2.5 py-1.5 text-gray-800">
              {feedback}
            </div>
          )}
        </div>

        {/* University */}
        <div>
          <span className="FieldH">University:</span>
          {isEditing ? (
            <select
              value={user.academicInstitution || ""}
              onChange={(e) => onEdit("academicInstitution", e.target.value)}
              className="dropdown"
            >
              {academicInstitutionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <span>{user.academicInstitution || "Not specified"}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
