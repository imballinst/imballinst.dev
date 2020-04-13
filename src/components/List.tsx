import styled from '@emotion/styled';
import { peepoTheme } from '../theme';

export const ListItem = styled.li`
  &:not(:first-child) {
    margin-left: ${peepoTheme.spacing(2)};
  }
`;
