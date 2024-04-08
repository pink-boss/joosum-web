import { useCallback, useMemo, useState } from "react";

export const useDisclosure = () => {
  const [isOpen, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((prev) => !prev), [setOpen]);
  const close = useCallback(() => setOpen(false), []);
  const value = useMemo(
    () => ({
      isOpen,
      toggle,
      close,
    }),
    [isOpen, toggle, close],
  );

  return value;
};
