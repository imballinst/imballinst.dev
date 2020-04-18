import { useRef, ChangeEvent, ReactNode } from 'react';
import { createId } from '../../helpers/utils';

export type CommonInputProps = {
  name: string;
  id?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  label: ReactNode;
};

export function useInputId(id?: string): string {
  return useRef(id || `${name}-${createId(3)}`).current;
}
