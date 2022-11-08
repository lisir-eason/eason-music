import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps, NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type mainTabParamList = {
  音乐: undefined;
  现场: undefined;
  咪咕圈: undefined;
  我的: undefined;
};

export type tracks = {
  id: number;
  url: string;
  title: string | undefined;
  duration: number;
  artist: string | undefined;
  artwork: string | undefined;
};

export type rootStackParamList = {
  Main: NavigatorScreenParams<mainTabParamList>;
  Playlist: {id: string};
  Player: {id: number; tracks: tracks[]};
};

export type allNavigationProps = CompositeScreenProps<
  BottomTabScreenProps<mainTabParamList>,
  NativeStackScreenProps<rootStackParamList>
>;
