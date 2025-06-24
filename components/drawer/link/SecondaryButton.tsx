import clsx from "clsx";

import ButtonLoading from "@/components/ButtonLoading";

type InputProps = {
  loading: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

export default function SecondaryButton({
  loading,
  onClick,
  children,
}: InputProps) {
  return (
    <button
      className={clsx(
        "h-[56px] w-[220.5px] rounded-lg font-bold text-white",
        "flex items-center justify-center gap-2",
        loading ? "cursor-not-allowed bg-gray-vapor" : "bg-gray-silver",
      )}
      disabled={loading}
      onClick={onClick}
    >
      <span>{children}</span>
      <ButtonLoading loading={loading} />
    </button>
  );
}
