import Image from "next/image";

import { useOpenDialogStore } from "@/store/useDialogStore";
import { Link } from "@/types/link.types";
import { sendGTMEvent } from "@next/third-parties/google";
import { usePathname } from "next/navigation";

type InputProps = {
  link: Link;
};

export default function OpenShareButton({ link }: InputProps) {
  const { openShareLink } = useOpenDialogStore();
  const pathname = usePathname();

  const handleClick = () => {
    sendGTMEvent({
      event:
        pathname === "/search"
          ? "click.share_detail_link_searchResult"
          : "click.share_detail_link_linkList",
    });
    openShareLink(true, link.linkId);
  };
  return (
    <button onClick={handleClick}>
      <Image
        src="/icons/icon-download2.png"
        alt="share"
        width={24}
        height={24}
      />
    </button>
  );
}
