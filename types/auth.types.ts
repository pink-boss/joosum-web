export type LoginResult =
  | {
      accessToken: string;
      refreshToken: string;
    }
  | {
      error: string;
    };

export type LogoutResult = {
  matchedCount: number;
  modifiedCount: number;
  upsertedCount: number;
  upsertedID: string;
};
