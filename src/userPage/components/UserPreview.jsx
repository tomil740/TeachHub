import React, { useEffect, useState } from "react";
import axios from "axios";
import { db } from "../../firebase";
import Rating from "./util/Rating";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import CalculateAverageRating from "../../components/RatingAvg";

function UserPreview({
  isEditing,
  onEdit,
  user,
  dealPrice,
  flex,
  canEdit,
  onMes,
}) {
  const navigate = useNavigate();
  const CLOUDINARY_URL =
    "https://api.cloudinary.com/v1_1/dp7crhkai/image/upload";
  const UPLOAD_PRESET = "Avivsalem";

  const [averageRating, setAverageRating] = useState(null);
  const [error, setError] = useState(null);

  const NavToLogIn = () => {
    navigate(`/login/${user.uid}`);
  };

  const handleImgChange = async (e) => {
    if (!isEditing) return;

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

        await setDoc(userDocRef, { imgUrl }, { merge: true });
        console.log("User image URL updated successfully.");
        onEdit("imgUrl", imgUrl);
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
  };

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const avg = await CalculateAverageRating(user.uid);
        setAverageRating(avg);
      } catch (err) {
        console.error("Error calculating average rating:", err);
        setError("Failed to calculate average rating");
      }
    };

    if (user?.uid) {
      fetchAverageRating();
    }
  }, [user?.uid]);

  return (
    <div
      className={`flex ${flex} flex-col justify-between gap-4 rounded-lg border p-4`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-4">
          <img
            className="h-16 w-16 rounded-full"
            onClick={() => document.getElementById("profileImgUpload").click()}
            src={user.imgUrl || "/images/default.jpeg"}
            alt={user.name}
          />
          {isEditing && (
            <input
              className="input-file"
              type="file"
              id="profileImgUpload"
              accept="image/*"
              onChange={handleImgChange}
              style={{ display: "none" }}
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
            {dealPrice[0] !== user.priceOfService && (
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
            {dealPrice[0] === user.priceOfService && (
              <span className="text-sm italic text-gray-500">
                {dealPrice[1]}
              </span>
            )}
          </div>

          <h1>
            Rating Avarege:{" "}
            {averageRating !== null ? (
              <>
                {/* {Number(averageRating).toFixed(2)} */}
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`text-lg ${
                        index < Math.round(averageRating)
                          ? "text-amber-500"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </>
            ) : (
              "Calculating..."
            )}
          </h1>

          {canEdit === false && (
            <button
              onClick={onMes}
              className="rounded bg-blue-500 px-8 py-1 text-base font-bold text-white transition hover:bg-blue-600"
            >
              Message
            </button>
          )}
          {canEdit === null && (
            <button
              onClick={NavToLogIn}
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
