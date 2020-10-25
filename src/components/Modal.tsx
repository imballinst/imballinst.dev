import React, { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';

const modalRoot = document.body;

const Backdrop = styled.div`
  background: rgba(0, 0, 0, 0.5);
  z-index: -1;
  position: fixed;
  inset: 0px;
`;

export function Modal({
  children,
  isOpen,
  onClose
}: {
  children: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}) {
  const elementRef = useRef(document.createElement('div'));

  useEffect(() => {
    elementRef.current.style.position = 'fixed';
    elementRef.current.style.top = '0';
    elementRef.current.style.right = '0';
    elementRef.current.style.bottom = '0';
    elementRef.current.style.left = '0';

    if (isOpen) {
      elementRef.current.style.zIndex = '1300';
    } else {
      elementRef.current.style.zIndex = '-1';
    }

    modalRoot.appendChild(elementRef.current);

    return () => {
      modalRoot.removeChild(elementRef.current);
    };
  }, [isOpen]);

  return !isOpen
    ? null
    : createPortal(
        <div>
          <Backdrop aria-hidden="true" onClick={onClose} />
          {children}
        </div>,
        elementRef.current
      );
}
