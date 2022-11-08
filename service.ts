import TrackPlayer, {Event} from 'react-native-track-player';

export const trackPlayerServices = async () => {
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
  TrackPlayer.addEventListener(Event.PlaybackTrackChanged, () => {});
  TrackPlayer.addEventListener(Event.PlaybackState, state => {
    console.log(state);
  });
};
