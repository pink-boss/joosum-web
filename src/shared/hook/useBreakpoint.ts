import { useEffect, useState } from "react";

export enum Breakpoint {
  BASE = "BASE",
  SM = "SM",
}

const BREAKPOINTS = [0, 822];

export const useBreakpoint = (): Breakpoint => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  let breakpoint = Breakpoint.BASE;

  if (width >= BREAKPOINTS[1]) {
    breakpoint = Breakpoint.SM;
  }
  return breakpoint;
};
