// TODO: make this better.
// This is animation instead of transition, though.
import React, { ReactNode, useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';

type Props = {
  children: ReactNode;
  width: number;
};

export function Rotate({ children, width }: Props) {
  const [index, setIndex] = useState(0);
  const transitions = useTransition(index, item => item, {
    from: { rotate: '0deg', translate: '0px' },
    enter: { rotate: '360deg', translate: '200px' },
    leave: { rotate: '0deg', translate: '0px' },
    config: { duration: 5000 }
  });

  useEffect(() => {
    function update() {
      setIndex(old => (old === 1 ? 0 : old + 1));
    }

    const interval = setInterval(update, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{ width }}>
      {transitions.map(({ item, key, props }) => {
        if (item !== index) {
          return null;
        }

        return (
          <animated.div key={key} style={props}>
            {children}
          </animated.div>
        );
      })}
    </div>
  );
}
