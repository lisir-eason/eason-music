import styled from 'styled-components';
import {View} from 'react-native';
import {MAIN_COLOR} from '@/constants/color';

export const PlaylistInfoBox = styled(View)`
  position: absolute;
  top: -300;
  width: 100%;
  height: 570;
  background-color: ${MAIN_COLOR};
  padding-left: 20;
  padding-right: 20;
  justify-content: center;
  align-items: flex-end;
  flex-direction: row;
  padding-bottom: 30;
`;

export const ListContainer = styled(View)`
  width: 100%;
  padding-left: 20;
  padding-right: 20;
`;
