import { sendGTMEvent } from "@next/third-parties/google";
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

  const onClickIllustrationBox = () => {
    sendGTMEvent({
      event: "click.select_folderIllust_addFolder",
    });
    setPreviewIllustration(stateName, illustration);
  };
  return (
    <button
      data-testid={`${stateName}-${illustrationIndex}`}
      className={clsx("relative size-20 rounded-lg bg-gray-vapor")}
      onClick={onClickIllustrationBox}
    >
      {isSelected && (
        <div className="absolute size-full rounded-lg bg-primary-500 opacity-20"></div>
      )}
      <div
        className={clsx(
          "flex size-full items-center justify-center rounded-lg border",
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
          <div className="text-sm text-gray-dim">선택 안함</div>
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
