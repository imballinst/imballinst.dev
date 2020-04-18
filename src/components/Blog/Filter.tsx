import React, { useState, ChangeEvent } from 'react';
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
import { useNavigate, useLocation } from '@reach/router';
import { stringify, parseQueryParams } from '../../helpers/utils';

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

export type FormState = {
  filterText: string;
  filterTags: string[];
};

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

  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState<FormState>(() => {
    let filterText = '';
    let filterTags: string[] = [];

    if (location.search.length > 0) {
      const parsed = parseQueryParams<FormState>(location.search);

      filterText = parsed.filterText || '';
      filterTags = parsed.filterTags || [];
    }

    return {
      filterText,
      filterTags
    };
  });

  function onChangeForm(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === 'filterText') {
      setForm(oldForm => ({ ...oldForm, filterText: value }));
    } else {
      setForm(oldForm => {
        const valueIndex = oldForm.filterTags.indexOf(value);
        let newFilterTags = oldForm.filterTags;

        if (valueIndex === -1) {
          newFilterTags = newFilterTags.concat(value);
        } else {
          newFilterTags = [...newFilterTags];
          newFilterTags.splice(valueIndex, 1);
        }

        return {
          ...oldForm,
          filterTags: newFilterTags
        };
      });
    }
  }

  function filterResults() {
    navigate(`${location.pathname}${stringify(form)}`);
    onTogglePopper();
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
                <PeepoButton onClick={filterResults}>Filter</PeepoButton>
              </Paper>
            </animated.div>
          </div>
        );
      })}
    </div>
  );
}
