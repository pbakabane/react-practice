import React from "react";

type CheckboxProps = {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
};

export const Checkbox: React.FC<CheckboxProps> = ({ isChecked, onChange }) => {
  return (
    <label>
      <input type='checkbox' checked={isChecked} onChange={(e) => onChange(e.target.checked)} />
    </label>
  );
};
