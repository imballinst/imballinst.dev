import { useRef } from 'react';
import { createId } from '../../helpers/utils';

export function useInputId(id?: string): string {
  return useRef(id || `${name}-${createId(3)}`).current;
}
