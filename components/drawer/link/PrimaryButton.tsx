import clsx from "clsx";

import ButtonLoading from "@/components/ButtonLoading";

type PrimaryUIButtonProps = {
  title?: string;
  loading: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function PrimaryUIButton({ loading, ...props }: PrimaryUIButtonProps) {
  return (
    <button
      className={clsx(
        "h-[56px] w-[220.5px] rounded-lg font-bold text-white",
        "flex items-center justify-center gap-2",
        loading ? "cursor-not-allowed bg-gray-vapor" : "bg-primary-500",
      )}
      {...props}
    />
  );
}

type InputProps = {
  title?: string;
  loading: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

export default function PrimaryButton({
  title,
  loading,
  onClick,
  children,
}: InputProps) {
  return (
    <PrimaryUIButton
      loading={loading || !title}
      disabled={loading || !title}
      onClick={onClick}
    >
      <span>{children}</span>
      <ButtonLoading loading={loading} />
    </PrimaryUIButton>
  );
}
