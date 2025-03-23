import dynamic from "next/dynamic";

const Notification = dynamic(() => import("./Notification"), {
  loading: () => null,
  ssr: false,
});

export { Notification };
