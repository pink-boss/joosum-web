import clsx from "clsx";

type InputProps = {
  title?: string;

  closeBtnName: string;
  onCloseCallback: () => void;

  submitBtnName: string;
  onSubmitCallback: () => void;
};

export default function Buttons({
  title,
  closeBtnName,
  onCloseCallback,
  submitBtnName,
  onSubmitCallback,
}: InputProps) {
  return (
    <div className="mt-auto flex justify-center gap-3">
      <button
        className="h-[56px] w-[220.5px] rounded-lg bg-gray-silver font-bold text-white"
        onClick={onCloseCallback}
      >
        {closeBtnName}
      </button>
      <button
        className={clsx(
          "h-[56px] w-[220.5px] rounded-lg font-bold text-white",
          !title ? "cursor-not-allowed bg-gray-vapor" : "bg-primary-500",
        )}
        disabled={!title}
        onClick={onSubmitCallback}
      >
        {submitBtnName}
      </button>
    </div>
  );
}
