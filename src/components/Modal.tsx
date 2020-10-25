import React, {
  forwardRef,
  ReactElement,
  ReactNode,
  useEffect,
  useRef
} from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { animated, useSpring } from 'react-spring';

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
      setTimeout(() => {
        elementRef.current.style.zIndex = '-1';
      }, 500);
    }

    modalRoot.appendChild(elementRef.current);

    return () => {
      modalRoot.removeChild(elementRef.current);
    };
  }, [isOpen]);

  return createPortal(
    <Fade in={isOpen}>
      <div>
        <Backdrop aria-hidden="true" onClick={onClose} />
        {children}
      </div>
    </Fade>,
    elementRef.current
  );
}

// Fade component.
type FadeProps = {
  children?: ReactElement;
  in: boolean;
  onEnter?: () => {};
  onExited?: () => {};
};

const Fade = forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    transitionDuration: '500s',
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    }
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});
