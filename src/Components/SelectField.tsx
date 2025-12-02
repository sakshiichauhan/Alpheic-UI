import React from 'react';

// Define the props for our component
interface SelectFieldProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  required?: boolean;
  /**
   * 'outlined' (default): Label sits on the border.
   * 'simple': Label sits above the input with 16px (gap-4) spacing.
   */
  layout?: 'outlined' | 'simple';
}

/**
 * A reusable select (dropdown) field component with two layout options,
 * styled to match the provided InputField.
 */
const SelectField: React.FC<SelectFieldProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
  required = false,
  layout = 'outlined', // Default to 'outlined'
}) => {
  // === Simple Layout ===
  // Renders a label *above* the select box with a 16px (gap-4) spacing.
  if (layout === 'simple') {
    return (
      <div className="flex flex-col w-full gap-4"> {/* gap-4 = 1rem = 16px */}
        <label
          htmlFor={id}
          className="text-[16px] font-medium text-[var(--medium-text)]"
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative w-full">
          <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            // All styles match your InputField
            className={`w-full border-2 border-[#E5E7EA] px-3 py-[14px] text-base font-urbanist focus:border-[var(--medium-text)] focus:ring-1 focus:ring-[var(--medium-text)] focus:outline-none appearance-none bg-white text-left ${
              // Set text color to match placeholder, or to black if a value is selected
              value ? 'text-[#999999]' : 'text-[#999999]'
            }`}
            style={{ direction: 'ltr', textAlign: 'left' }}
          >
            {/* Placeholder option */}
            <option value="" disabled>
              {placeholder}
            </option>
            
            {/* Map over the provided options (set text to black for readability in dropdown) */}
            {options.map((option) => (
              <option key={option.value} value={option.value} className="text-black">
                {option.label}
              </option>
            ))}
          </select>
          
          {/* Custom arrow icon */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
          </div>
        </div>
      </div>
    );
  }

  // === Outlined Layout (Default) ===
  // Renders the label "on the border"
  return (
    <div className="relative w-full">
      {/* Outlined label copied from your InputField */}
      <label
        htmlFor={id}
        className="absolute -top-2.5 left-3 text-[16px] text-[var(--medium-text)] bg-white px-1 z-10"
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        // All styles match your InputField
        className={`w-full border-2 border-[#E5E7EA] px-3 py-[14px] text-base font-urbanist focus:border-[var(--medium-text)] focus:ring-1 focus:ring-[var(--medium-text)] focus:outline-none appearance-none bg-white text-left ${
          // Use #999999 for both placeholder and selected value text to match InputField
          value ? 'text-[#999999]' : 'text-[#999999]'
        }`}
        style={{ direction: 'ltr', textAlign: 'left' }}
      >
        {/* Placeholder option */}
        <option value="" disabled>
          {placeholder}
        </option>
        
        {/* Map over the provided options (set text to black for readability in dropdown) */}
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-black">
            {option.label}
          </option>
        ))}
      </select>
      
      {/* Custom arrow icon */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
      </div>
    </div>
  );
};

export default SelectField;