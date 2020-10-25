import React from 'react';
import { FormLabel } from './FormLabel';
import { useInputId, CommonInputProps } from './common';
import { peepoTheme } from '../../theme';
import { cls } from '../../helpers/styles';

interface TextFieldProps extends CommonInputProps {
  className?: string;
  placeholder?: string;
  type?: 'inline' | 'vertical';
}

export function TextField({
  className,
  id,
  label,
  type,
  ...props
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
          className={cls(
            `appearance-none border-2 border-gray-200 rounded w-full p-2 leading-tight focus:outline-none focus:${peepoTheme.borderColorSets.dark.main.twClass}`,
            className
          )}
          id={textFieldId}
          type="text"
          {...props}
        />
      </div>
    </fieldset>
  );
}
