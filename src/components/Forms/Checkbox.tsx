import React from 'react';
import { FormLabel } from './FormLabel';
import { useInputId, CommonInputProps } from './common';

interface CheckboxProps extends CommonInputProps {
  checked?: boolean;
}

export function Checkbox({
  name,
  checked,
  id,
  onChange,
  value,
  label
}: CheckboxProps) {
  const checkboxId = useInputId(id);

  return (
    <fieldset className="inline-block whitespace-pre">
      <input
        id={checkboxId}
        name={name}
        onChange={onChange}
        value={value}
        checked={checked}
        className="mr-2 leading-tight"
        type="checkbox"
      />
      <FormLabel htmlFor={checkboxId}>{label}</FormLabel>
    </fieldset>
  );
}
