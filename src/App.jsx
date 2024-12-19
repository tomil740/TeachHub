import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router";
import { db } from "./firebase"; // Adjust the path as per your file structure
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const sampleUsers = [
      {
        name: "John Doe",
        email: "johndoe@example.com",
        religion: "Jewish",
        dob: "1990-01-01",
        education: "Tel Aviv University (TAU)",
        experience: "5 years in software development",
        profession: "Full-Stack Developer",
      },
      // ... other users
    ];

    const addTestUsers = async () => {
      try {
        const promises = sampleUsers.map(async (user, index) => {
          const userId = `testUser${index + 1}`; // Unique identifier

          // Create user account with email and password
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            user.email,
            "defaultPassword",
          ); // Use a secure password in production
          const uid = userCredential.user.uid;

          // Update user profile with additional info
          await updateProfile(userCredential.user, {
            displayName: user.name,
          });

          // Add user data to Firestore
          await setDoc(doc(db, "users", uid), {
            ...user,
            coins: 0, // Default coins for the user
          });

          console.log(`User ${userId} added successfully with authentication.`);
        });

        await Promise.all(promises);
        console.log("All test users added successfully with authentication!");
      } catch (error) {
        console.error("Error adding test users:", error);
      }
    };

    addTestUsers();
  }, []);

  return <RouterProvider router={router} />;
}
