import React from 'react';

interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  type?: 'text' | 'email' | 'tel';
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

/**
 * A reusable input field component with an "outlined"
 * label-on-the-border design.
 */
const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div className="relative w-full">
      <label
        htmlFor={id}
        className="absolute -top-2.5 left-3 text-[16px] text-[var(--medium-text)] bg-white px-1 z-10"
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border-2 border-[#E5E7EA] px-3 py-[14px] text-base text-[#999999] font-urbanist placeholder-[#999999] focus:border-[var(--medium-text)] focus:ring-1 focus:ring-[var(--medium-text)] focus:outline-none"
      />
    </div>
  );
};

export default InputField;