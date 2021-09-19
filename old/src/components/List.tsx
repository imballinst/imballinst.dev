import styled from '@emotion/styled';
import { peepoTheme } from '../theme';

export const ListItem = styled.li`
  &:not(:first-of-type) {
    margin-left: ${peepoTheme.spacing(2)};
  }
`;
