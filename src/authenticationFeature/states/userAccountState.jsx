import { atom } from "recoil";

export const userAccountState = atom({
  key: "userAccountState",
  default: {
    userId: null,
    name: "Guest",
    coins: 0,
    isLoading: false,
    isAuthenticated: false,
  },
});
