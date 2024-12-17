"use client";

import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();
  const onClick = () => {
    fetch("/auth/logout", {
      method: "POST",
    })
      .then(async (res) => {
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert(data.data);
          router.push("/login");
        }
      });
  };
  return <button onClick={onClick}>로그아웃</button>;
}
