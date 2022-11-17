import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {CustomTrack} from '@/types';
import {RepeatMode, State} from 'react-native-track-player';

interface PlayerState {
  currentTrack: null | CustomTrack;
  currentQueue: [] | CustomTrack[];
  repeatMode: RepeatMode;
  state: State;
  lyric: string;
}

const initialState: PlayerState = {
  currentTrack: null,
  currentQueue: [],
  repeatMode: RepeatMode.Off,
  state: State.None,
  lyric: '',
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    updateCurrentTrack: (state, action: PayloadAction<CustomTrack>) => {
      state.currentTrack = action.payload;
    },
    updateCurrentQueue: (state, action: PayloadAction<CustomTrack[]>) => {
      state.currentQueue = action.payload;
    },
    updateRepeatMode: (state, action: PayloadAction<RepeatMode>) => {
      state.repeatMode = action.payload;
    },
    updateState: (state, action: PayloadAction<State>) => {
      state.state = action.payload;
    },
    updateLyric: (state, action: PayloadAction<string>) => {
      state.lyric = action.payload;
    },
  },
});

export const {updateCurrentTrack, updateCurrentQueue, updateRepeatMode, updateState, updateLyric} =
  playerSlice.actions;

export default playerSlice.reducer;
