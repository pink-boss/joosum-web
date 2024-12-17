import Cookies from "js-cookie";
import { useEffect, useState } from "react";

// TODO: refresh 토큰으로 갱신
export function useAccessToken() {
  const [token, setToken] = useState<string | undefined>();

  useEffect(() => {
    const cookieToken = Cookies.get("accessToken");
    setToken(cookieToken);
  }, []);

  return token;
}
