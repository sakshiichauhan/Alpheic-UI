import React from 'react';

interface CheckboxProps {
  label: string | React.ReactNode;
  id: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const Checkbox: React.FC<CheckboxProps> = ({
  label,
  id,
  name,
  checked,
  onChange,
}) => {
  return (
    <label htmlFor={id} className="flex items-center gap-[8px] cursor-pointer group">
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className="hidden" // Hide the default checkbox
      />
      {/* Custom Checkbox */}
      <span
        className={`w-[20px] h-[20px] border-2 ${
          checked
            ? 'bg-[var(--color)] border-[var(--color)]'
            : 'bg-white border-[#D2D3D7] group-hover:border-[#D2D3D7]/50'
        } transition-all duration-150 flex items-center justify-center`}
      >
        {/* Checkmark Icon (visible when checked) */}
        {checked && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        )}
      </span>
      {/* Label */}
      <span className="text-[16px] font-urbanist font-medium text-[var(--medium-text)]">{label}</span>
    </label>
  );
};

export default Checkbox;