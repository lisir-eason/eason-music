import {NavigatorScreenParams} from '@react-navigation/native';

export type mainTabParamList = {
  音乐: undefined;
  现场: undefined;
  播放: undefined;
  咪咕圈: undefined;
  我的: undefined;
};

export type rootStackParamList = {
  Main: NavigatorScreenParams<mainTabParamList>;
  Playlist: {id: number};
};
