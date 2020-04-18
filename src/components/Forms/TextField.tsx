import React, { ChangeEvent } from 'react';
import { FormLabel } from './FormLabel';
import { useInputId } from './common';
import { peepoTheme } from '../../theme';

type TextFieldProps = {
  name: string;
  id?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: 'inline' | 'vertical';
  label?: string;
};

export function TextField({
  name,
  id,
  onChange,
  label,
  type,
  value
}: TextFieldProps) {
  const textFieldId = useInputId(id);
  const isInline = type === 'inline';

  return (
    <fieldset>
      {label && (
        <div className={isInline ? 'md:w-1/3' : undefined}>
          <FormLabel htmlFor={textFieldId}>{label}</FormLabel>
        </div>
      )}
      <div className={isInline ? 'md:w-2/3' : undefined}>
        <input
          className={`appearance-none border-2 border-gray-200 rounded w-full p-2 leading-tight focus:outline-none focus:${peepoTheme.borderColorSets.dark.main.twClass}`}
          id={textFieldId}
          type="text"
          value={value}
          onChange={onChange}
          name={name}
        />
      </div>
    </fieldset>
  );
}
