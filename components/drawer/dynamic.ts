import dynamic from "next/dynamic";

const SaveLinkDrawer = dynamic(() => import("./link/SaveDrawer"), {
  loading: () => null,
  ssr: false,
});

const MutateLinkDrawer = dynamic(() => import("./link/MutateDrawer"), {
  loading: () => null,
  ssr: false,
});

const UserDrawer = dynamic(() => import("./user/UserDrawer"), {
  loading: () => null,
  ssr: false,
});

export { SaveLinkDrawer, MutateLinkDrawer, UserDrawer };
