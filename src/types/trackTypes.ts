import {Track} from 'react-native-track-player';

export interface CustomTrack extends Track {
  id: number;
}

export type ResponseTrackProps = {
  id: number;
  name: string;
  al: {name: string; id: number; picUrl: string};
  ar: {
    id: number;
    name: string;
  }[];
};

export type ResponsePlaylistProps = null | {
  name: string;
  coverImgUrl: string;
  description: string;
  updateFrequency: string | null;
  tracks: ResponseTrackProps[];
};
