import { atom } from "recoil";

/*
  Shared user state should be placed better
*/
export const chatsUnreadState = atom({
  key: "chatsUnreadState", // Unique ID for the atom
  default: 0, // Default value, can be null or an empty string
});