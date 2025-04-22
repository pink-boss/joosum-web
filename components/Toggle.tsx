import React from "react";

type InputProps = {
  isOn: boolean;
  onUpdate: () => void;
};

const Toggle: React.FC<InputProps> = ({ isOn, onUpdate }) => {
  const handleToggle = () => {
    onUpdate();
  };

  return (
    <label className="relative inline-block h-5 w-[33px]">
      {/* 실제 체크박스는 화면에서 숨기고, peer 클래스를 사용하여 상태를 연결합니다. */}
      <input
        type="checkbox"
        checked={isOn}
        onClick={handleToggle}
        className="peer sr-only"
        readOnly
      />
      {/* 배경(OFF/ON에 따라 색상 변경) */}
      <span className="absolute inset-0 cursor-pointer rounded-full bg-gray-slate transition-colors duration-300 peer-checked:bg-primary-500" />
      {/* 토글 버튼(원) */}
      <span className="absolute left-0.5 top-0.5 size-4 rounded-full bg-white transition-transform duration-300 peer-checked:translate-x-3" />
    </label>
  );
};

export default Toggle;
