import { atom } from "recoil";

/*
  Shared user state should be placed better
*/
export const AuthenticatedUserState = atom({
  key: "AuthenticatedUserState", // Unique ID for the atom
  default: null, // Default value, can be null or an empty string
});
