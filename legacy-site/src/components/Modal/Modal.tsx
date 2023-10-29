/* This example requires Tailwind CSS v2.0+ */
import type { JSX } from 'preact';
import { useState, useRef, useEffect, useCallback } from 'preact/hooks';
import { DEFAULT_BG } from '../../helpers/tag-styles';
import { Text } from '../Typography';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  children: JSX.Element;
}

export function Modal({
  open,
  onClose,
  onSubmit,
  children,
  title
}: ModalProps) {
  const modalContentRef = useRef<HTMLDivElement>(null);
  const isShownRef = useRef(open);
  const [transition, setTransition] = useState<'appear' | 'disappear'>(
    open ? 'appear' : 'disappear'
  );
  const [isShown, setIsShown] = useState(open);

  useEffect(() => {
    // Event handler.
    function clickAwayListener(e: MouseEvent) {
      if (
        !modalContentRef.current?.contains(e.target as any) &&
        isShownRef.current
      ) {
        onClose();
      }
    }

    if (open) {
      document.addEventListener('click', clickAwayListener);
    }

    // Transition.
    setTransition(open ? 'appear' : 'disappear');

    const timeout = setTimeout(() => {
      setIsShown(open);
    }, 500);

    // Set ref.
    isShownRef.current = open;

    return () => {
      clearTimeout(timeout);
      document.removeEventListener('click', clickAwayListener);
    };
  }, [open]);

  useEffect(() => {
    function listener(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keyup', listener);

    return () => {
      document.removeEventListener('keyup', listener);
    };
  }, [onClose]);

  if (!isShown && !open) {
    return null;
  }

  let transitionClassName = 'opacity-0';

  if (transition === 'appear') {
    transitionClassName = 'opacity-1';
  }

  return (
    <div
      className={`fixed h-screen w-screen top-0 left-0 transition-opacity bg-gray-700/90 z-10 ${transitionClassName}`}
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      <div className="h-full flex flex-col justify-center items-center">
        <div
          className={`${DEFAULT_BG} rounded-lg shadow-xl transform sm:max-w-lg sm:w-full p-4`}
          ref={modalContentRef}
        >
          <Text as="h3" className="m-0">
            {title}
          </Text>
          <div className="mt-2">{children}</div>
        </div>
      </div>
    </div>
  );
}
