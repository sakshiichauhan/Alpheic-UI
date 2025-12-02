import React from 'react';

interface RadioButtonProps {
  label: string | React.ReactNode;
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * A reusable radio button component.
 * Mirrors the look-and-feel of the custom checkbox so both inputs stay consistent.
 */
const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  id,
  name,
  value,
  checked,
  onChange,
}) => {
  return (
    <label htmlFor={id} className="flex items-center gap-[8px] cursor-pointer group">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden" // Hide the default radio
      />
      {/* Custom radio */}
      <span
        className={`w-[20px] h-[20px] border-2 rounded-full ${
          checked
            ? 'border-[var(--color)]'
            : 'border-[#D2D3D7] group-hover:border-[#D2D3D7]/50'
        } transition-all duration-150 flex items-center justify-center`}
      >
        {checked && <span className="w-[10px] h-[10px] rounded-full bg-[var(--color)]" />}
      </span>
      {/* Label */}
      <span className="text-[16px] font-urbanist font-medium text-[var(--medium-text)]">{label}</span>
    </label>
  );
};

export default RadioButton;
