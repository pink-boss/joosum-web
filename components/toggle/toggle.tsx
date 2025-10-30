import { useCallback } from 'react';

interface Props {
  isOn: boolean;
  onUpdate: () => void;
  dataTestId?: string;
}

export default function Toggle({ isOn, onUpdate, dataTestId }: Props) {
  const handleToggle = useCallback(() => {
    onUpdate();
  }, [onUpdate]);

  return (
    <label className="relative inline-block h-5 w-8.25">
      <input
        readOnly
        checked={isOn}
        className="peer sr-only"
        data-testid={dataTestId}
        type="checkbox"
        onClick={handleToggle}
      />
      <span className="absolute inset-0 rounded-full bg-gray-600 transition-colors duration-300 peer-checked:bg-primary-500" />
      <span className="absolute left-0.5 top-0.5 size-4 rounded-full bg-white transition-transform duration-300 peer-checked:translate-x-3" />
    </label>
  );
}
