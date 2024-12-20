import clsx from "clsx";
import Image from "next/image";

type InputProps = {
  illustration?: string | null;
  previewIllustration?: string | null;
  setPreviewIllustration: (
    name: string,
    value: string | undefined | null,
  ) => void;
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
  const isSelected =
    previewIllustration == illustration ||
    (isEmpty(previewIllustration) && isEmpty(illustration));
  return (
    <button
      data-testid={`${stateName}-${illustrationIndex}`}
      className={clsx("bg-gray-vapor relative h-20 w-20 rounded-lg")}
      onClick={() => {
        setPreviewIllustration(stateName, illustration);
      }}
    >
      {isSelected && (
        <div className="bg-primary-500 absolute h-full w-full rounded-lg opacity-20"></div>
      )}
      <div
        className={clsx(
          "flex h-full w-full items-center justify-center rounded-lg border",
        )}
      >
        {illustration ? (
          <Image
            src={`/link-book/${illustration}.png`}
            alt={illustration}
            width={54.34}
            height={54.34}
          />
        ) : (
          <div className="text-gray-dim text-sm">선택 안함</div>
        )}
      </div>
    </button>
  );
}

const isEmpty = (illustration: string | undefined | null) => {
  return (
    illustration === "" || illustration === undefined || illustration === null
  );
};
