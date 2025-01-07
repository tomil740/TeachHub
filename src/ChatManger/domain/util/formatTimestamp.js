import { Timestamp } from "firebase/firestore";

export const formatTimestamp = (timestamp) => {
  if (timestamp instanceof Timestamp) {
    return new Date(timestamp.seconds * 1000).toLocaleString(); // Formats to a human-readable string
  }
  return null;
};
