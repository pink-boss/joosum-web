import dynamic from "next/dynamic";

const ReassignLinkBookDialog = dynamic(
  () => import("./ReassignLinkBookDialog"),
  {
    loading: () => null,
    ssr: false,
  },
);

const SelectLinkBook = dynamic(() => import("./SelectLinkBook"), {
  loading: () => null,
  ssr: false,
});

const ShareLinkDialog = dynamic(() => import("./ShareLinkDialog"), {
  loading: () => null,
  ssr: false,
});

export { ReassignLinkBookDialog, SelectLinkBook, ShareLinkDialog };
