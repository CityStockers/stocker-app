import { atom } from "recoil";

export const recoilUserId = atom<string>({
  key: "userId",
  default: "0",
});
