import { useOpenDrawerStore } from "@/store/useDrawerStore";

export default function OpenLinkSaveDrawerButton() {
  const { openLinkDrawer } = useOpenDrawerStore();
  const handleClick = () => {
    openLinkDrawer(true, "save");
  };
  return (
    <button
      className="h-[48px] w-[200px] rounded-xl bg-black text-xl font-bold text-white"
      onClick={handleClick}
    >
      링크 저장
    </button>
  );
}
