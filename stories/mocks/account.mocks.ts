import { Account, TQueryAccount } from "@/types/account.types";

export const mockAccount: Account = {
  age: 30,
  createdAt: "2023-11-21T12:30:00Z",
  email: "pinkbossjoosum@gmail.com",
  gender: "w",
  id: "account-1",
  name: "테스트 계정",
  social: "apple",
  updatedAt: "2024-03-21T15:30:00Z",
  userId: "user-1",
};

export const mockTQueryAccount: TQueryAccount = {
  user: mockAccount,
  totalLinkCount: 1423,
  totalFolderCount: 12,
};
