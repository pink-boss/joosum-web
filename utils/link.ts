import { Link } from "@/types/link.types";

type SuccessLinkResult = [Link, { status: 204 }];

export const isSuccessfullLinkResponse = (
  response: (Link | ApiError | { status: number })[],
): response is SuccessLinkResult => {
  return response.every((item) => !("error" in item));
};
