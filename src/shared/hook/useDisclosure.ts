import { useCallback, useMemo, useState } from "react";

export const useDisclosure = () => {
  const [isOpen, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((prev) => !prev), [setOpen]);

  const value = useMemo(
    () => ({
      isOpen,
      toggle,
    }),
    [isOpen, toggle],
  );

  return value;
};
