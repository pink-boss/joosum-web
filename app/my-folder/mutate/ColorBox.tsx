import clsx from "clsx";
import Image from "next/image";

const WHITE_COLOR = "#FFFFFF";

type InputProps = {
  color: string;
  previewColor?: string;
  setPreviewColor: (name: string, value: string) => void;
  stateName: string;
  colorIndex: number;
};

export default function ColorBox({
  color,
  previewColor,
  setPreviewColor,
  stateName,
  colorIndex,
}: InputProps) {
  const isSelected = previewColor && previewColor === color;
  const isBrightColor = [WHITE_COLOR, "#FFFFB4"].includes(color);
  const isWhiteColor = color === WHITE_COLOR;
  return (
    <button
      data-testid={`${stateName}-${colorIndex}`}
      className={clsx("h-12 w-12 rounded-lg border", isSelected && "p-0")}
      style={{ backgroundColor: color, borderColor: color }}
      onClick={() => {
        setPreviewColor(stateName, color);
      }}
    >
      <div
        className={clsx(
          "flex h-full w-full items-center justify-center rounded-lg border",
          isBrightColor ? "border-black" : "border-white",
          isSelected
            ? "block"
            : isWhiteColor
              ? "block [&>img]:hidden"
              : "hidden",
        )}
      >
        <Image
          src="/link-book/check.png"
          alt="check"
          width={12.47}
          height={8.31}
          className={clsx("brightness-100", isBrightColor && "invert")}
        />
      </div>
    </button>
  );
}
