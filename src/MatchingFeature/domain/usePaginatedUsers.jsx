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
  const [users, setUsers] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading1, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const PAGE_SIZE = 2;
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
