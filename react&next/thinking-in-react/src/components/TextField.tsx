import React from 'react';

type TextFiledProps = {
  label: string;
  placeholder: string;
  filterText: string;
  setFilterText: (value: string) => void;
};

export default function TextField({
  label, placeholder, filterText, setFilterText,
}: TextFiledProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFilterText(value);
  };

  const id = `input-${label}`;
  return (
    <div>
      <label
        htmlFor={id}
        style={{
          paddingRight: '1rem',
        }}
      >
        {label}
      </label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        value={filterText}
        onChange={handleChange}
      />
    </div>
  );
}
