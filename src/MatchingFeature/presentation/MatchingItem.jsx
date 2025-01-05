import { Link } from "react-router-dom";
import useMatchScore from "../domain/useMatchScore";
import { useEffect, useState } from "react";
import calculateServicePrice from "../../userPage/domain/calculateServicePrice";

function MatchingItem({ profileData, user, onNext, onPrevious }) {
  const {
    uid,
    name = "Unknown Name",
    aboutMe = "No description available",
    imgUrl,
    typeOfService = [],
    coins = 0,
    rating = "N/A",
    priceOfService = "N/A",
    experience = "N/A",
    religion = "N/A",
    language = [],
    dob = "N/A",
  } = profileData;

  const { matchScore, loading, error } = useMatchScore(user, profileData);
  const [dealPrice, setDealPrice] = useState([]);

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

  function isAgedMatched(age){
    const userAge = user?.dob
      if (
        (userAge != null || userAge != undefined) &&
        (age != null || age != undefined || "N/A")
      ) {
        const userAge1 = calculateAge(userAge);
        const profileAge = calculateAge(age);

        return Math.abs(userAge1 - profileAge) <= 5;
      }else{
        return false
      }

  }

  const isLanguageMatched = (language) => user?.language?.includes(language);
  const isServiceMatched = (service) => user?.typeOfService?.includes(service);
  const isRatingMatched =
    rating !== "N/A" && parseFloat(rating) >= 4.0; // Assuming a match threshold of 4.0
  const isReligionMatched = (religion) => {
    if (user?.religion != null || user?.religion != undefined){
      return religion !== "N/A" && religion !== user?.religion; // Match if religion is different from the user's religion
    }else{
      return false
    }
  };

  const isExperienceMatched = (experience) => {
    const experienceDifference =
      experience && user?.experience
        ? Math.abs(experience - user.experience)
        : -20;
    return experienceDifference >= 1 && experienceDifference <= 5; // Match if experience difference is between 1 and 5
  };

  useEffect(() => {
    if (user && profileData) {
      const price = calculateServicePrice(
        user.religion || "N/A",
        profileData.religion || "N/A",
        profileData.priceOfService || 0
      );
      setDealPrice(price);
    }
  }, [user, profileData]);

  return (
    <div
      className="relative mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl"
      style={{
        width: "100%",
        maxWidth: "calc(100vw - 32px)",
        boxSizing: "border-box",
      }}
    >
      <div className="flex flex-col gap-4 overflow-hidden rounded-xl border bg-white pb-16 shadow-md">
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
            src={imgUrl || "/images/defaultServ.jpg"}
            alt={displayTypeOfService}
            className="h-full w-full object-cover"
          />
        </section>

        {/* PROGRESS BAR SECTION */}
        <section className="absolute right-4 top-4 z-10 flex flex-col items-center gap-2">
          <div className="relative flex h-20 w-20 items-center justify-center">
            <div className="absolute h-full w-full rounded-full bg-white shadow-lg"></div>
            <div
              className="relative flex h-16 w-16 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(
                  #4caf50 ${currentMatchScore ? (currentMatchScore / 200) * 100 : 0}%,
                  #e0e0e0 ${currentMatchScore ? (currentMatchScore / 200) * 100 : 0}%
                )`,
                padding: "4px",
                transition: "background 1s ease-out",
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
                src={imgUrl || "/images/defaultAvatar.jpg"}
                alt={name}
              />
              <div className="flex flex-col">
                <h4 className="font-bold capitalize md:text-lg lg:text-xl">
                  {name}
                </h4>
                <p
                  className={`truncate-title text-lg font-bold ${
                    isServiceMatched(truncatedTypeOfService)
                      ? "text-green-500"
                      : "text-blue-500"
                  }`}
                >
                  {truncatedTypeOfService}
                </p>
              </div>
            </section>

            <p className="line-clamp-2 text-sm text-gray-700 md:text-base">
              {aboutMe}
            </p>

            {/* ADDITIONAL FIELDS */}
            <section className="grid grid-cols-2 gap-4 text-sm md:text-base">
              {/* Experience Field */}
              <div>
                <strong>Experience:</strong>{" "}
                <span
                  className={`inline-block rounded-full px-2 py-1 text-xs ${
                    isExperienceMatched(experience) // Check if experience is within 1-5 range
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {experience}
                </span>
              </div>

              {/* Religion Field */}
              <div>
                <strong>Religion:</strong>{" "}
                <span
                  className={`inline-block rounded-full px-2 py-1 text-xs ${
                    isReligionMatched(religion) // Match if religion is different
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {religion}
                </span>
              </div>

              {/* Language Field */}
              <div>
                <strong>Language:</strong>{" "}
                {language?.map((lang, idx) => (
                  <span
                    key={idx}
                    className={`inline-block rounded-full px-2 py-1 text-xs ${
                      isLanguageMatched(lang) // Check if language is matched
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {lang}
                  </span>
                ))}
              </div>

              {/* Age Field */}
              <div>
                <strong>Age:</strong>{" "}
                <span
                  className={`inline-block rounded-full px-2 py-1 text-xs ${
                    isAgedMatched(dob)
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {dob !== "N/A" ? calculateAge(dob) : "N/A"}
                </span>
              </div>
            </section>

            {/* MATCHED TYPES OF SERVICE CHIPS */}
            <section className="mt-4 px-4">
              <h4 className="mb-2 text-sm font-semibold text-gray-700">
                Services Offered:
              </h4>
              <div className="scrollbar-hide flex gap-2 overflow-x-auto">
                {typeOfService.map((service, index) => (
                  <span
                    key={index}
                    className={`flex-shrink-0 rounded-full px-4 py-2 text-xs font-medium md:text-sm ${
                      isServiceMatched(service)
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {service}
                  </span>
                ))}
              </div>
            </section>

            {/* RATING AND PRICE SECTION */}
            <section className="flex items-center justify-center gap-4 md:justify-between">
              {/* Rating Section */}
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-star text-sm text-amber-500 md:text-base"></i>
                <p
                  className={`text-sm font-bold md:text-base ${
                    isRatingMatched ? "text-green-500" : "text-amber-500"
                  }`}
                >
                  {rating}
                </p>
              </div>

              {/* Deal Price Presentation */}
              <div className="flex flex-col items-center gap-1 md:ml-4 md:flex-row md:items-center">
                {/* Base Price with Discount Styling */}
                <span
                  className={`text-2xl font-semibold tracking-wider text-amber-500 ${
                    dealPrice[0] !== priceOfService
                      ? "text-sm line-through"
                      : ""
                  }`}
                >
                  {profileData.priceOfService}$
                </span>

                {/* Deal Price Section (larger if discount exists) */}
                {dealPrice[0] !== priceOfService && (
                  <div className="flex flex-col items-center gap-1 md:ml-4">
                    <span className="text-3xl font-semibold text-green-600">
                      ${dealPrice[0]}
                    </span>
                    <span className="text-sm italic text-gray-500">
                      {dealPrice[1]}
                    </span>
                  </div>
                )}
              </div>
            </section>
          </section>
        </article>

        {/* Bottom Navigation Icons */}
        <div className="absolute bottom-4 left-1/2 flex w-full max-w-xs -translate-x-1/2 transform items-center justify-between px-8 sm:px-16">
          <button
            onClick={onNext}
            className="rounded-full bg-red-500 p-3 text-white hover:bg-red-600"
          >
            <i className="fa-solid fa-xmark text-2xl"></i>
          </button>
          <Link
            to={`/profile/${uid}`}
            className="rounded-full bg-green-500 p-3 text-white hover:bg-green-600"
          >
            <i className="fa-solid fa-heart text-2xl"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}


export default MatchingItem;
