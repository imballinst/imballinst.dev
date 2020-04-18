import React, { useState } from 'react';
import { usePopper } from 'react-popper';
import { useTransition, animated } from 'react-spring';

import { Checkbox } from '../Forms/Checkbox';
import { Paper } from '../Paper';
import { TagCount } from './Posts';
import { Typography } from '../Typography';
import styled from '@emotion/styled';
import { peepoTheme } from '../../theme';
import { TextField } from '../Forms/TextField';
import { PeepoButton, PeepoIconButton } from '../Button';
import { FilterIcon } from '../../img/FilterIcon';

type FilterProps = {
  tags: TagCount[];
};

const CheckboxSpacer = styled.div`
  display: inline-block;
  &:not(:last-child) {
    margin-right: ${peepoTheme.spacing(4)};
  }
`;

enum PopperState {
  HIDDEN,
  SHOWN
}

export function Filter({ tags }: FilterProps) {
  const [buttonElement, setButtonElement] = useState<HTMLButtonElement | null>(
    null
  );
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(buttonElement, popperElement, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    placement: 'bottom-start'
  });

  const [index, set] = useState(PopperState.HIDDEN);
  const transitions = useTransition(index, item => item, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 250 }
  });

  function onTogglePopper() {
    set(index === PopperState.SHOWN ? PopperState.HIDDEN : PopperState.SHOWN);
  }

  return (
    <div className="relative">
      <div className="flex flex-row justify-end">
        <PeepoIconButton ref={setButtonElement} onClick={onTogglePopper}>
          <FilterIcon />
        </PeepoIconButton>
      </div>
      {transitions.map(({ item, key, props }) => {
        if (item === PopperState.HIDDEN) {
          return <animated.div key={key} style={props} />;
        }
        // We can tweak this here.

        return (
          <div
            ref={setPopperElement}
            style={styles.popper}
            className="z-20 shadow"
            {...attributes.popper}
          >
            <animated.div key={key} style={props}>
              <Paper>
                <div ref={setArrowElement} style={styles.arrow} />
                <div className="mb-4">
                  <TextField name="textFIlter" label="Filter text" />
                </div>
                <Typography variant="h6" className="font-semibold">
                  Tags
                </Typography>
                <div className="mb-4">
                  {tags.map(tag => (
                    <CheckboxSpacer key={tag.fieldValue}>
                      <Checkbox
                        name="tagsFilter"
                        value={tag.fieldValue}
                        label={tag.fieldValue}
                      />
                    </CheckboxSpacer>
                  ))}
                </div>
                <PeepoButton>Filter</PeepoButton>
              </Paper>
            </animated.div>
          </div>
        );
      })}
    </div>
  );
}
