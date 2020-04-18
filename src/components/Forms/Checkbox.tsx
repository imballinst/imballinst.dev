import React, { ReactNode, useRef, ChangeEvent } from 'react';
import { FormLabel } from './FormLabel';
import { useInputId } from './common';

type CheckboxProps = {
  name: string;
  id?: string;
  checked?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  label: ReactNode;
};

export function Checkbox({
  name,
  checked,
  id,
  onChange,
  label
}: CheckboxProps) {
  const checkboxId = useInputId(id);

  return (
    <fieldset className="inline-block whitespace-pre">
      <input
        id={checkboxId}
        name={name}
        onChange={onChange}
        checked={checked}
        className="mr-2 leading-tight"
        type="checkbox"
      />
      <FormLabel htmlFor={checkboxId}>{label}</FormLabel>
    </fieldset>
  );
}
