import { useState, useEffect } from "react";
import { db } from "../../firebase.js"; 
import { doc, getDoc } from "firebase/firestore";

const LOCAL_STORAGE_KEY = "users_cache";

export default function useGetUserById(userId) {
  const [user, setUser] = useState(null);
  const [loading1, setLoading] = useState(true);
  const [error1, setError] = useState(null);

  // Helper: Retrieve a user from the cache by ID
  const getUserFromCache = (id) => {
    const cachedUsers = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!cachedUsers) return null;
    return JSON.parse(cachedUsers).find((user) => user.uid === id);
  };

  // Helper: Update the cache with a new user
  const updateCache = (newUser) => {
    const cachedUsers = localStorage.getItem(LOCAL_STORAGE_KEY);
    const users = cachedUsers ? JSON.parse(cachedUsers) : [];

    // Check for duplicates before adding
    const existingUserIndex = users.findIndex(
      (user) => user.uid === newUser.uid,
    );
    if (existingUserIndex === -1) {
      users.push(newUser);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
    }
  };

  // Fetch a user from Firestore
  const fetchUserFromServer = async (id) => {
    try {
      const docRef = doc(db, "users", id);
      const userDoc = await getDoc(docRef);
      if (userDoc.exists()) {
        return { id: userDoc.uid, ...userDoc.data() };
      }
      throw new Error("User not found in the database.");
    } catch (err) {
      console.error("Error fetching user from server:", err);
      throw new Error("Failed to fetch user data from server.");
    }
  };

  useEffect(() => {
    // Early return if no userId
    if (!userId) {
      setUser(null);
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      setLoading(true);
      setError(null);

      try {
        // Check cache first
        const cachedUser = getUserFromCache(userId);
        if (cachedUser) {
          setUser(cachedUser);
        } else {
          // Fetch from server if not in cache
          const serverUser = await fetchUserFromServer(userId);
          setUser(serverUser);
          updateCache(serverUser); // Update the cache with the fetched user
        }
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]); // Dependency array ensures hook re-runs on userId change

  return { user, loading1, error1 };
}
