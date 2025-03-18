import dynamic from "next/dynamic";

const UserDrawer = dynamic(() => import("./user/UserDrawer"), {
  loading: () => null,
  ssr: false,
});

const LinkSaveDrawer = dynamic(() => import("./LinkSaveDrawer"), {
  loading: () => null,
  ssr: false,
});

export { UserDrawer, LinkSaveDrawer };
