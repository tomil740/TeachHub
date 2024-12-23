import Rating from "./util/Rating";

function UserPreview({ isEditing, onEdit, user, flex }) {
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
        onEdit("imgUrl", imgURL); // Update the profile image using onEdit callback
      }
    }
  };

  return (
    <div
      className={`flex ${flex} flex-col justify-between gap-4 rounded-lg border p-4`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-4">
          {/* Image as clickable to open file input */}
          <img
            className="h-16 w-16 rounded-full"
            onClick={() => document.getElementById("profileImgUpload").click()} // Trigger the file input on image click
            src={user.imgURL || "/images/default.jpeg"}
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
            <h2 className="font-bold md:text-lg">{user.name}</h2>
            <span className="font-bold text-blue-500">
              {user.typeOfService.join(" | ")}
            </span>
          </div>
        </div>
        <Rating rating={user.rating} />
      </div>

      <div>
        {isEditing ? (
          <textarea
            value={user.aboutMe}
            onChange={(e) => onEdit("aboutMe", e.target.value)}
            className="min-h-[100px] w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-600 transition-colors duration-300 focus:border-blue-500"
            placeholder="Edit about me"
          />
        ) : (
          <p className="text-sm md:text-base">{user.aboutMe}</p>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div>
            <i class="fa-brands fa-bitcoin transform text-3xl text-amber-500"></i>
            <span className="ml-1 text-2xl font-semibold tracking-wider text-amber-500">
              {user.coins}
            </span>
          </div>
          <button className="rounded bg-blue-500 px-8 py-1 text-base font-bold text-white transition hover:bg-blue-600">
            Message
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserPreview;
