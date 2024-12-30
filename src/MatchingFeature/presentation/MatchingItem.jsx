import React from "react";
import { Link } from "react-router-dom";
import useMatchScore from "../domain/useMatchScore";

function MatchingItem({ profileData, user, onNext, onPrevious }) {
  const {
    uid,
    name,
    description,
    imgUrl,
    typeOfService,
    coins,
    rating,
    priceOfService,
    experience,
    religion,
    language,
    dob,
  } = profileData;

  const { matchScore, loading, error } = useMatchScore(user, profileData);

  const truncatedTypeOfService =
    typeOfService.join(" | ").split(" ").slice(0, 3).join(" ") +
    (typeOfService.join(" | ").split(" ").length > 3 ? "..." : "");

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const displayTypeOfService = typeOfService.join(" | ");

  const currentMatchScore = error ? -1 : matchScore;

  return (
    <div className="relative mx-4 flex w-full max-w-md flex-col gap-4 overflow-hidden rounded-xl border bg-white pb-16 shadow-md sm:mx-auto sm:max-w-lg md:max-w-xl lg:max-w-2xl">
      {/* Top Left Reverse Icon */}
      <button
        onClick={onPrevious}
        className="absolute left-4 top-4 rounded-full bg-gray-200 p-2 hover:bg-gray-300"
      >
        <i className="fa-solid fa-arrow-left text-lg"></i>
      </button>

      {/* IMG SECTION */}
      <section className="h-48 w-full">
        <img
          src={imgUrl || "/images/defultServ.jpg"}
          alt={displayTypeOfService}
          className="h-full w-full object-cover"
        />
      </section>

      {/* PROGRESS BAR SECTION */}
      <section className="absolute right-4 top-4 z-10 flex flex-col items-center gap-2">
        {/* Progress Circle Container */}
        <div className="relative flex h-20 w-20 items-center justify-center">
          {/* Shadowed Circle Background */}
          <div className="absolute h-full w-full rounded-full bg-white shadow-lg"></div>

          {/* Thin Progress Bar */}
          <div
            className="relative flex h-16 w-16 items-center justify-center rounded-full"
            style={{
              background: `conic-gradient(
          #4caf50 ${currentMatchScore ? (currentMatchScore / 200) * 100 : 0}%,
          #e0e0e0 ${currentMatchScore ? (currentMatchScore / 200) * 100 : 0}%
        )`,
              padding: "4px", // To make the progress bar thinner
              transition: "background 1s ease-out", // Smooth transition for progress
            }}
          >
            {loading ? (
              <div className="h-14 w-14 animate-spin rounded-full border-4 border-t-4 border-blue-500"></div>
            ) : (
              <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-white">
                {currentMatchScore !== -1 ? currentMatchScore : "N/A"}
              </span>
            )}
          </div>
        </div>

        {/* Progress Label */}
        <h4 className="mt-2 text-sm font-semibold text-gray-700">
          Matching Score
        </h4>

        {error && (
          <p className="text-xs text-red-500">
            Please log in to get a match score
          </p>
        )}
      </section>

      {/* CONTENT SECTION */}
      <article className="px-6 py-4">
        <section className="flex flex-col gap-6">
          {/* HEADER SECTION */}
          <section className="flex items-start gap-4">
            <img
              className="h-16 w-16 rounded-full object-cover"
              src={imgUrl}
              alt={name}
            />
            <div className="flex flex-col">
              <h4 className="font-bold capitalize md:text-lg lg:text-xl">
                {name}
              </h4>
              <p className="truncate-title text-lg font-bold text-blue-500">
                {displayTypeOfService}
              </p>
            </div>
          </section>

          <p className="line-clamp-2 text-sm text-gray-700 md:text-base">
            {description}
          </p>

          {/* ADDITIONAL FIELDS */}
          <section className="grid grid-cols-2 gap-4 text-sm md:text-base">
            <div>
              <strong>Experience:</strong> {experience} years
            </div>
            <div>
              <strong>Religion:</strong> {religion}
            </div>
            <div>
              <strong>Language:</strong> {language?.join(", ")}
            </div>
            <div>
              <strong>Age:</strong> {calculateAge(dob)}
            </div>
          </section>

          {/* RATING AND PRICE SECTION */}
          <section className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-star text-sm text-amber-500 md:text-base"></i>
              <p className="text-sm font-bold text-amber-500 md:text-base">
                {rating}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-brands fa-bitcoin transform text-3xl text-amber-500"></i>
              <h3 className="text-sm font-bold text-amber-500 md:text-base">
                {priceOfService}
              </h3>
            </div>
          </section>
        </section>
      </article>

      {/* Bottom Navigation Icons */}
      <div className="absolute bottom-4 left-1/2 flex w-full max-w-xs -translate-x-1/2 transform items-center justify-between px-8 sm:px-16">
        {/* Pass (X) */}
        <button
          onClick={onNext}
          className="rounded-full bg-red-500 p-3 text-white hover:bg-red-600"
        >
          <i className="fa-solid fa-xmark text-2xl"></i>
        </button>

        {/* Love (Link to Profile) */}
        <Link
          to={`/profile/${uid}`}
          className="rounded-full bg-green-500 p-3 text-white hover:bg-green-600"
        >
          <i className="fa-solid fa-heart text-2xl"></i>
        </Link>
      </div>
    </div>
  );
}

export default MatchingItem;
