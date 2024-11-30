import clsx from "clsx";
import Image from "next/image";

type InputProps = {
  illustration: string;
  previewIllustration?: string;
  setPreviewIllustration: (name: string, value: string) => void;
  stateName: string;
  illustrationIndex: number;
};

export default function IllustrationBox({
  illustration,
  previewIllustration,
  setPreviewIllustration,
  stateName,
  illustrationIndex,
}: InputProps) {
  const isSelected = previewIllustration == illustration;
  return (
    <button
      data-testid={`${stateName}-${illustrationIndex}`}
      className={clsx("relative h-20 w-20 rounded-lg bg-background-menu")}
      onClick={() => {
        setPreviewIllustration(stateName, illustration);
      }}
    >
      {isSelected && (
        <div className="absolute h-full w-full rounded-lg bg-primary opacity-20"></div>
      )}
      <div
        className={clsx(
          "flex h-full w-full items-center justify-center rounded-lg border",
        )}
      >
        {illustration ? (
          <Image
            src={`/link-book/illustration/${illustration}.png`}
            alt="check"
            width={54.34}
            height={54.34}
          />
        ) : (
          <div className="text-sm text-text-secondary">선택 안함</div>
        )}
      </div>
    </button>
  );
}
