import React, { ReactNode, useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';

type Props = {
  children: ReactNode;
};

export function Transition({ children }: Props) {
  const [index] = useState(0);
  const transitions = useTransition(index, item => item, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 1500 }
  });

  return (
    <div>
      {transitions.map(({ key, props }) => {
        return (
          <animated.div key={key} style={props}>
            {children}
          </animated.div>
        );
      })}
    </div>
  );
}
