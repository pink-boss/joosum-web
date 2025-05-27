import clsx from "clsx";

interface TriangleProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?:
    | "primary"
    | "secondary"
    | "black"
    | "white"
    | "red"
    | "blue"
    | "green";
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export default function Triangle({
  size = "md",
  color = "black",
  direction = "up",
  className = "",
}: TriangleProps) {
  // 방향과 크기별 클래스 설정
  const getTriangleClasses = () => {
    const baseClasses = "w-0 h-0";

    // 크기별 설정
    const sizeClasses = {
      sm: {
        up: "border-l-[25px] border-r-[25px] border-b-[43px] border-l-transparent border-r-transparent",
        down: "border-l-[25px] border-r-[25px] border-t-[43px] border-l-transparent border-r-transparent",
        left: "border-t-[25px] border-b-[25px] border-r-[43px] border-t-transparent border-b-transparent",
        right:
          "border-t-[25px] border-b-[25px] border-l-[43px] border-t-transparent border-b-transparent",
      },
      md: {
        up: "border-l-[50px] border-r-[50px] border-b-[87px] border-l-transparent border-r-transparent",
        down: "border-l-[50px] border-r-[50px] border-t-[87px] border-l-transparent border-r-transparent",
        left: "border-t-[50px] border-b-[50px] border-r-[87px] border-t-transparent border-b-transparent",
        right:
          "border-t-[50px] border-b-[50px] border-l-[87px] border-t-transparent border-b-transparent",
      },
      lg: {
        up: "border-l-[75px] border-r-[75px] border-b-[130px] border-l-transparent border-r-transparent",
        down: "border-l-[75px] border-r-[75px] border-t-[130px] border-l-transparent border-r-transparent",
        left: "border-t-[75px] border-b-[75px] border-r-[130px] border-t-transparent border-b-transparent",
        right:
          "border-t-[75px] border-b-[75px] border-l-[130px] border-t-transparent border-b-transparent",
      },
      xl: {
        up: "border-l-[100px] border-r-[100px] border-b-[173px] border-l-transparent border-r-transparent",
        down: "border-l-[100px] border-r-[100px] border-t-[173px] border-l-transparent border-r-transparent",
        left: "border-t-[100px] border-b-[100px] border-r-[173px] border-t-transparent border-b-transparent",
        right:
          "border-t-[100px] border-b-[100px] border-l-[173px] border-t-transparent border-b-transparent",
      },
    };

    // 색상별 설정
    const colorClasses = {
      primary: {
        up: "border-b-primary-500",
        down: "border-t-primary-500",
        left: "border-r-primary-500",
        right: "border-l-primary-500",
      },
      secondary: {
        up: "border-b-secondary",
        down: "border-t-secondary",
        left: "border-r-secondary",
        right: "border-l-secondary",
      },
      black: {
        up: "border-b-black",
        down: "border-t-black",
        left: "border-r-black",
        right: "border-l-black",
      },
      white: {
        up: "border-b-white",
        down: "border-t-white",
        left: "border-r-white",
        right: "border-l-white",
      },
      red: {
        up: "border-b-red-500",
        down: "border-t-red-500",
        left: "border-r-red-500",
        right: "border-l-red-500",
      },
      blue: {
        up: "border-b-blue-500",
        down: "border-t-blue-500",
        left: "border-r-blue-500",
        right: "border-l-blue-500",
      },
      green: {
        up: "border-b-green-500",
        down: "border-t-green-500",
        left: "border-r-green-500",
        right: "border-l-green-500",
      },
    };

    return clsx(
      baseClasses,
      sizeClasses[size][direction],
      colorClasses[color][direction],
    );
  };

  return <div className={clsx(getTriangleClasses(), className)} />;
}
