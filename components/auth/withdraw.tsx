"use client";

import { useRouter } from "next/navigation";

export default function Withdraw() {
  const router = useRouter();
  const onClick = () => {
    fetch("/auth/withdraw", {
      method: "DELETE",
    })
      .then(async (res) => {
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert(data.message);
          router.push("/login");
        }
      });
  };
  return <button onClick={onClick}>회원 탈퇴</button>;
}
