import React from "react";
import axios from "axios";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

function UserPreview({ isEditing, onEdit, user, flex, canEdit }) {
  const CLOUDINARY_URL =
    "https://api.cloudinary.com/v1_1/dp7crhkai/image/upload";
  const UPLOAD_PRESET = "Avivsalem";

  const handleImgChange = async (e) => {
    if (isEditing) {
      const file = e.target.files[0];
      if (file) {
        try {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", UPLOAD_PRESET);

          const response = await axios.post(CLOUDINARY_URL, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          const imgUrl = response.data.secure_url;

          const userDocRef = doc(db, "users", user.uid);
          await setDoc(userDocRef, { imgUrl: imgUrl }, { merge: true });

          console.log("User image URL updated successfully.");
          onEdit("imgUrl", imgUrl);
        } catch (error) {
          console.error("Image upload failed:", error);
        }
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
            src={user.imgUrl || "/images/default.jpeg"}
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
    </div>
  );
}

export default UserPreview;
