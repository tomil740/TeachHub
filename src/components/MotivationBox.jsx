import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { processRoleMood } from "../Services/GeminiAI.jsx";

export default function MotivationBox() {
  const [Sentence, setSentence] = useState(null);
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [sentenceType, setSentenceType] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Get user role from Firestore
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log(userData.typeOfService);

            // Await the result from processRoleMood
            const sentencesArray = await processRoleMood(
              userData.typeOfService,
            );
            console.log("Fetched Sentences:", sentencesArray);
            const randomIndex = Math.floor(
              Math.random() * sentencesArray.length,
            );
            const randomRole = Math.floor(Math.random() * 2);
            console.log(randomRole);
            const typeRoole = ["joke", "motivational"];
            const randomSentence = sentencesArray[randomIndex];

            const currentroole = typeRoole[randomRole];
            console.log(currentroole);
            console.log("spezop:" + randomSentence[currentroole]);
            // Set the sentence and type (joke or motivation)
            setSentence(randomSentence[currentroole]);
            setSentenceType(currentroole);
          } else {
            setError("No user data found");
          }
        } catch (err) {
          setError("Failed to fetch user data.");
        }
      } else {
        setError("No user is logged in.");
      }
    });

    return () => unsubscribe();
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 left-5 z-50 w-52 rounded-lg bg-blue-600 p-5 text-white shadow-lg md:w-96">
      {/* Close Button */}
      <button
        className="absolute right-2 top-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-white bg-transparent text-sm text-white transition duration-200 hover:bg-white hover:text-blue-600"
        onClick={() => setIsVisible(false)}
      >
        ✖
      </button>

      {/* Title based on sentence type */}
      <h3 className="mb-3 text-center text-lg font-bold">
        {sentenceType === "joke" ? "The Daily Joke" : "The Daily Motivation"}
      </h3>

      {/* Conditionally render the motivational sentence or error */}
      <h4 className="text-sm leading-relaxed">{error || Sentence}</h4>
    </div>
  );
}
