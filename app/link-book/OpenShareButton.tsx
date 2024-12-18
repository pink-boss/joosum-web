import { useOpenDialogStore } from "@/store/useDialogStore";
import { Link } from "@/types/link.types";
import Image from "next/image";

type InputProps = {
  link: Link;
};

export default function OpenShareButton({ link }: InputProps) {
  const { openShareLink } = useOpenDialogStore();

  const handleClick = () => {
    openShareLink(true, link.linkId);
  };
  return (
    <button onClick={handleClick}>
      <Image
        src="icons/icon-download2.png"
        alt="share"
        width={24}
        height={24}
      />
    </button>
  );
}
