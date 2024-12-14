import dynamic from "next/dynamic";

const MutateLinkBookDialog = dynamic(
  () => import("@/app/my-folder/mutate/MutateDialog"),
  {
    loading: () => null,
    ssr: false,
  },
);
const DeleteLinkBookDialog = dynamic(
  () => import("@/app/my-folder/DeleteDialog"),
  {
    loading: () => null,
    ssr: false,
  },
);
const DeleteLinkDialog = dynamic(() => import("@/app/link-book/DeleteDialog"), {
  loading: () => null,
  ssr: false,
});

export { MutateLinkBookDialog, DeleteLinkBookDialog, DeleteLinkDialog };
