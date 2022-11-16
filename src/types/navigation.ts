import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps, NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type MainTabParamList = {
  音乐: undefined;
  现场: undefined;
  咪咕圈: undefined;
  我的: undefined;
};

export type Tracks = {
  id: number;
  url: string;
  title: string | undefined;
  duration: number;
  artist: string | undefined;
  artwork: string | undefined;
};

export type RootStackParamList = {
  Main: NavigatorScreenParams<MainTabParamList>;
  Playlist: {id: string};
  Player: {id: number; tracks: Tracks[]};
};

export type AllNavigationProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList>,
  NativeStackScreenProps<RootStackParamList>
>;
