import { atom } from "recoil";

export const userAccountState = atom({
  key: "userAccountState",
  default: {
    userId: null,
    name: null,
    coins: 0,
    isLoading: false,
    isAuthenticated: false,
  },
});
