import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
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
import { FilterIcon } from '../../icons/FilterIcon';

type FilterProps = {
  numberOfPosts: number;
  tags: TagCount[];
  onChangeForm: (event: ChangeEvent<HTMLInputElement>) => void;
  onFilterSubmit: () => void;
  form: FormState;
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

export type FormState = {
  filterText: string;
  filterTags: string[];
};

export function Filter({
  tags,
  form,
  onChangeForm,
  onFilterSubmit,
  numberOfPosts
}: FilterProps) {
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

  function filterResults(e: FormEvent) {
    e.preventDefault();

    onFilterSubmit();
    onTogglePopper();
  }

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      const clickedElement = e.target as Element;

      if (popperElement !== null) {
        if (!popperElement.contains(clickedElement)) {
          set(PopperState.HIDDEN);
        }
      }
    }

    document.addEventListener('click', onClickOutside);

    return () => {
      document.removeEventListener('click', onClickOutside);
    };
  }, [popperElement]);

  return (
    <div className="flex flex-row mb-4">
      <div className="flex flex-1 items-center">
        {location.search !== '' ? `${numberOfPosts} results found` : null}
      </div>
      <div className="flex flex-1 justify-end">
        <PeepoIconButton ref={setButtonElement} onClick={onTogglePopper}>
          <FilterIcon size={18} />
        </PeepoIconButton>
        {transitions.map(({ item, key, props }) => {
          if (item === PopperState.HIDDEN) {
            return <animated.div key={key} style={props} />;
          }

          return (
            <div
              ref={setPopperElement}
              style={styles.popper}
              className="z-20 shadow"
              key={key}
              {...attributes.popper}
            >
              <animated.div style={props}>
                <Paper>
                  <form onSubmit={filterResults}>
                    <div ref={setArrowElement} style={styles.arrow} />
                    <div className="mb-4">
                      <TextField
                        name="filterText"
                        label="Filter text"
                        onChange={onChangeForm}
                        value={form.filterText}
                      />
                    </div>
                    <Typography variant="h6" className="font-semibold">
                      Tags
                    </Typography>
                    <div className="mb-4">
                      {tags.map(tag => (
                        <CheckboxSpacer key={tag.fieldValue}>
                          <Checkbox
                            name="filterTags"
                            onChange={onChangeForm}
                            checked={form.filterTags.includes(tag.fieldValue)}
                            value={tag.fieldValue}
                            label={tag.fieldValue}
                          />
                        </CheckboxSpacer>
                      ))}
                    </div>
                    <PeepoButton type="submit" fullWidth>
                      Filter
                    </PeepoButton>
                  </form>
                </Paper>
              </animated.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}