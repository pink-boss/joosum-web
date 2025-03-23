import dynamic from "next/dynamic";

const Notification = dynamic(() => import("./Toast"), {
  loading: () => null,
  ssr: false,
});

export { Notification };
