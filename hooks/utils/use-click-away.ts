import { useEffect, useRef } from 'react';

interface Props {
  onClose: () => void;
}

export default function useClickAway({ onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // 외부 영역 터치하면 닫기
  useEffect(() => {
    if (!ref.current) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return ref;
}
