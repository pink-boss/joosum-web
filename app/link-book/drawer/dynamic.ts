import dynamic from "next/dynamic";

const MutateLinkDrawer = dynamic(() => import("./MutateLinkDrawer"), {
  loading: () => null,
  ssr: false,
});

const DeleteDrawerLinkDialog = dynamic(() => import("./DeleteDialog"), {
  loading: () => null,
  ssr: false,
});

export { MutateLinkDrawer, DeleteDrawerLinkDialog };
