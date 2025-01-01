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
    <div style={styles.box}>
      <button
        style={styles.closeButton}
        onClick={() => setIsVisible(false)}
        onMouseEnter={(e) =>
          Object.assign(e.target.style, styles.closeButtonHover)
        }
        onMouseLeave={(e) => Object.assign(e.target.style, styles.closeButton)}
      >
        ✖
      </button>
      {/* Title based on sentence type */}
      <h3 style={styles.title}>
        {sentenceType === "joke" ? "The Daily Joke" : "The Daily Motivation"}
      </h3>
      {/* Conditionally render the motivational sentence or error */}
      <h4 style={styles.text}>{error || Sentence}</h4>
    </div>
  );
}

const styles = {
  box: {
    position: "fixed", // Ensures it stays at the bottom-left of the screen while scrolling
    bottom: "20px", // Position from the bottom of the viewport
    left: "20px", // Position from the left of the viewport
    backgroundColor: "#1c4ed8", // Cool blue background
    color: "#fff", // White text for contrast
    padding: "20px", // Padding for the content
    boxShadow: "0 8px 16px rgba(28, 78, 216, 0.4)", // Subtle shadow with blue tint
    borderRadius: "10px", // Rounded corners for a modern look
    zIndex: 1000, // Ensures it stays on top of other elements
    maxWidth: "300px", // Limit the box width
  },
  closeButton: {
    position: "absolute", // Absolute positioning inside the box
    top: "10px", // Space from the top
    right: "10px", // Space from the right
    background: "transparent", // Transparent background
    border: "1px solid #fff", // White border
    color: "#fff", // White text (color for ✖)
    fontSize: "16px", // Font size for the close button
    borderRadius: "50%", // Rounded button for aesthetics
    width: "24px", // Button size
    height: "24px", // Button size
    cursor: "pointer", // Pointer cursor on hover
    display: "flex", // Center the ✖ inside the button
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s, color 0.2s", // Hover animation
  },
  closeButtonHover: {
    background: "#fff", // White background on hover
    color: "#1c4ed8", // Blue color for the ✖
  },
  title: {
    margin: "0 0 10px 0", // Add margin to the bottom for spacing
    fontSize: "18px", // Larger font size for the title
    fontWeight: "bold", // Bold title
    textAlign: "center", // Center-align the title
  },
  text: {
    margin: 0, // Removes default margin from the text
    fontSize: "16px", // Slightly larger font
    lineHeight: "1.4", // Better text spacing
  },
};
