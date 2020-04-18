import React, { useRef, useState } from 'react';
import { usePopper } from 'react-popper';

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

export function Filter({ tags }: FilterProps) {
  // return <Example />;

  const [buttonElement, setButtonElement] = useState<HTMLButtonElement | null>(
    null
  );
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const [isPopperOpen, setIsPopperOpen] = useState(false);

  const { styles, attributes } = usePopper(buttonElement, popperElement, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    placement: 'bottom-start'
  });

  function onTogglePopper() {
    setIsPopperOpen(oldState => !oldState);
  }

  return (
    <div className="relative">
      <div className="flex flex-row justify-end">
        <PeepoIconButton ref={setButtonElement} onClick={onTogglePopper}>
          <FilterIcon />
        </PeepoIconButton>
      </div>
      {isPopperOpen && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
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
        </div>
      )}
    </div>
  );
}
