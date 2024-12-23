import Rating from "./util/Rating";

function UserPreview({ isEditing, onEdit, user }) {
  const professionOptions = [
    "Basic Programming",
    "Full-Stack Development",
    "Front-End Development",
    "Back-End Development",
    "Mobile Development",
    "Data Analysis",
    "UI/UX Design",
    "Graphic Design",
    "Video Editing",
    "Digital Marketing",
  ];

  const handleImgChange = (e) => {
    if (isEditing) {
      const file = e.target.files[0];
      if (file) {
        const imgURL = URL.createObjectURL(file);
        onEdit("profileImg", imgURL); // Update the profile image using onEdit callback
      }
    }
  };

  return (
    <div className="relative flex flex-col gap-4 rounded-xl border p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Image as clickable to open file input */}
          <img
            className="h-24 w-24 rounded-full"
            onClick={() => document.getElementById("profileImgUpload").click()} // Trigger the file input on image click
            src={user.imgURL}
            alt={user.name}
          />

          {/* Hidden file input element */}
          {isEditing && (
            <input
              className="input-file"
              type="file"
              id="profileImgUpload"
              accept="image/*"
              onChange={handleImgChange}
              style={{ display: "none" }} // Hide the input field
            />
          )}

          <div>
            <h2 id="infoSectionH2" className="text-lg font-bold text-red-500">
              {user.name}
            </h2>
            {isEditing ? (
              <select
                value={user.typeOfService}
                onChange={(e) => onEdit("typeOfService", e.target.value)}
                className="relative inline-block w-full cursor-pointer border-none bg-transparent px-6 py-1 text-base font-normal text-black"
              >
                {professionOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <span>{user.typeOfService}</span>
            )}
          </div>
        </div>
        <p className="text-lg font-bold text-red-600">Coins: {user.coins}</p>
      </div>
      <div className="flex flex-col gap-4">
        {isEditing ? (
          <textarea
            value={user.aboutMe}
            onChange={(e) => onEdit("aboutMe", e.target.value)}
            className="min-h-[100px] w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-600 transition-colors duration-300 focus:border-[#007bff]"
            placeholder="Edit about me"
          />
        ) : (
          <p className="text-lg text-red-600">{user.aboutMe}</p>
        )}
        <div className="flex">
          <Rating rating={user.rating} />
          <button className="message-btn">Message</button>
        </div>
      </div>
    </div>
  );
}

export default UserPreview;
