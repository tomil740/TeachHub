import Rating from "./util/Rating";

function UserPreview({ isEditing, onEdit, user, flex, canEdit, onMes,dealPrice }) {
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
              {user.typeOfService?.join(" | ")}
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
          <div className="flex items-center space-x-4">
            <i className="fa-brands fa-bitcoin transform text-3xl text-amber-500"></i>
            <span className="ml-1 text-2xl font-semibold tracking-wider text-amber-500">
              {user.priceOfService}
            </span>
            {/* need to be changed to user.servicePrice or somthing matched... */}
            {dealPrice[0] != user.priceOfService && (
              <div className="flex flex-col items-start">
                <span className="text-xl font-medium text-gray-700">
                  Updated Price:
                  <span className="text-green-600">${dealPrice[0]}</span>
                </span>
                <span className="text-sm italic text-gray-500">
                  {dealPrice[1]}
                </span>
              </div>
            )}
            {dealPrice[0] == user.priceOfService && (
              <span className="text-sm italic text-gray-500">
                {dealPrice[1]}
              </span>
            )}
          </div>

          {canEdit === false && (
            <button
              onClick={onMes}
              className="rounded bg-blue-500 px-8 py-1 text-base font-bold text-white transition hover:bg-blue-600"
            >
              Message
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserPreview;
