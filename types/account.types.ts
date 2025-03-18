export interface Account {
  age: number;
  createdAt: string;
  email: string;
  gender: string;
  id: string;
  name: string;
  social: string;
  updatedAt: string;
  userId: string;
}

export type TQueryAccount = {
  user: Account;
  totalLinkCount: number;
  totalFolderCount: number;
};
