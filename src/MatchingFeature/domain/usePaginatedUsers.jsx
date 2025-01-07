import { useState, useEffect, useCallback, useRef } from "react";
import { db } from "../../firebase.js";
import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
} from "firebase/firestore";

export default function usePaginatedUsers() {
  const PAGE_SIZE = 25;
  const LOCAL_STORAGE_KEY = "users_cache";

  const [lastDoc, setLastDoc] = useState(null);
  const [loading1, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [users, setUsers] = useState(() => {
    const cachedUsers = localStorage.getItem(LOCAL_STORAGE_KEY);
    return cachedUsers ? JSON.parse(cachedUsers) : [];
  });

  const saveToLocalCache = (newUsers) => {
    const cachedUsers =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    const uniqueNewUsers = newUsers.filter(
      (user) => !cachedUsers.some((cachedUser) => cachedUser.uid === user.uid),
    );
    const updatedCache = [...cachedUsers, ...uniqueNewUsers];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCache));
  };

  const isInitialFetch = useRef(true);

  const fetchUsers = async (lastDocument = null) => {
    if (loading1) return;

    setLoading(true);
    try {
      let queryRef = query(
        collection(db, "users"),
        orderBy("createdAt"),
        limit(PAGE_SIZE),
      );

      if (lastDocument) {
        queryRef = query(queryRef, startAfter(lastDocument));
      }

      const querySnapshot = await getDocs(queryRef);

      const newUsers = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Avoid data duplication
      setUsers((prev) => {
        const existingIds = new Set(prev.map((user) => user.id));
        return [
          ...prev,
          ...newUsers.filter((user) => !existingIds.has(user.id)),
        ];
      });

      saveToLocalCache(newUsers);


      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1] || null);
      setHasMore(querySnapshot.docs.length === PAGE_SIZE);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreUsers = useCallback(() => {
    if (!loading1 && hasMore) {
      fetchUsers(lastDoc);
    }
  }, [lastDoc, loading1, hasMore]);

  useEffect(() => {
    if (isInitialFetch.current) {
      fetchUsers();
      isInitialFetch.current = false;
    }
  }, []);

  return { users, setUsers, loading1, hasMore, loadMoreUsers };
}
