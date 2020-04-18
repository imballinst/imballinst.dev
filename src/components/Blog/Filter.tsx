import React from 'react';
import { Checkbox } from '../Forms/Checkbox';
import { Paper } from '../Paper';
import { TagCount } from './Posts';
import { Typography } from '../Typography';
import styled from '@emotion/styled';
import { peepoTheme } from '../../theme';
import { TextField } from '../Forms/TextField';
import { PeepoButton } from '../Button';

type FilterProps = {
  tags: TagCount[];
};

const CheckboxSpacer = styled.div`
  display: inline-block;
  &:not(:last-child) {
    margin-right: ${peepoTheme.spacing(4)};
  }
`;

export const Filter = ({ tags }: FilterProps) => (
  <Paper>
    <div className="mb-4">
      <TextField name="textFIlter" label="Filter text" />
    </div>
    <Typography variant="h6" className="font-semibold">
      Tags
    </Typography>
    <div className="mb-4">
      {tags.map(tag => (
        <CheckboxSpacer>
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
);
