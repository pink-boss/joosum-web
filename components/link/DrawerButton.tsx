import Image from "next/image";

import { useOpenDrawerStore } from "@/store/useDrawerStore";
import { Link } from "@/types/link.types";
import { usePathname } from "next/navigation";
import { sendGTMEvent } from "@next/third-parties/google";

type InputProps = { link: Link };

export default function DrawerButton({ link }: InputProps) {
  const { openLinkDrawer } = useOpenDrawerStore();
  const pathname = usePathname();
  const handleOpenMutateLinkDrawer = () => {
    sendGTMEvent({
      event:
        pathname === "/search"
          ? "click.detail_link_searchResult"
          : "click.detail_link_linkList",
    });
    openLinkDrawer(true, "mutate", link);
  };
  return (
    <button data-testid="drawer-button" onClick={handleOpenMutateLinkDrawer}>
      <Image
        src="/icons/icon-more-vertical-gray.png"
        alt="more-vertical"
        width={24}
        height={24}
      />
    </button>
  );
}
