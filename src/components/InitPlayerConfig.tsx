import {useEffect, useCallback, useRef} from 'react';
import TrackPlayer, {Event, Capability, RepeatMode} from 'react-native-track-player';
import {showMessage} from 'react-native-flash-message';

import {updateState, updateCurrentTrack, updateLyric} from '@/store/PlayerSlice';
import {useAppDispatch, useAppSelector} from '@/hooks/ReduxToolkit';
import {CustomTrack} from '@/types';
import {getLyricById} from '@/apis/songApi';

const InitPlayerConfig = () => {
  const dispatch = useAppDispatch();
  const currentQueue = useAppSelector(state => state.player.currentQueue);
  const saveQueue = useRef<CustomTrack[] | []>([]);

  useEffect(() => {
    saveQueue.current = currentQueue;
  }, [currentQueue]);

  const trackPlayerServices = useCallback(() => {
    return (async () => {
      TrackPlayer.addEventListener(Event.RemotePlay, async () => {
        await TrackPlayer.play();
      });
      TrackPlayer.addEventListener(Event.RemotePause, async () => {
        await TrackPlayer.pause();
      });
      TrackPlayer.addEventListener(Event.PlaybackTrackChanged, async () => {
        const nowIndex = await TrackPlayer.getCurrentTrack();
        if (nowIndex !== null) {
          const nowTrack = await TrackPlayer.getTrack(nowIndex);
          const track = saveQueue.current.find(item => item.url === nowTrack?.url) as CustomTrack;
          dispatch(updateCurrentTrack(track));
          if (track?.id) {
            const res = await getLyricById(track.id);
            if (res) {
              dispatch(updateLyric(res.data.lrc.lyric));
            }
          }
        }
      });
      TrackPlayer.addEventListener(Event.PlaybackState, e => {
        dispatch(updateState(e.state));
      });
      TrackPlayer.addEventListener(Event.RemoteNext, async () => {
        const currentIndex = await TrackPlayer.getCurrentTrack();
        const currentModel = await TrackPlayer.getRepeatMode();
        if (currentIndex === null) {
          return;
        }
        if (
          currentIndex === saveQueue.current.length - 1 &&
          (currentModel === RepeatMode.Off || currentModel === RepeatMode.Track)
        ) {
          showMessage({
            message: '已经是最后一首歌了!',
            type: 'danger',
          });
          return;
        }
        await TrackPlayer.skipToNext();
      });
      TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
        const currentIndex = await TrackPlayer.getCurrentTrack();
        if (currentIndex === null) {
          return;
        }
        if (currentIndex === 0) {
          showMessage({
            message: '已经是第一首歌了!',
            type: 'danger',
          });
          return;
        }
        await TrackPlayer.skipToPrevious();
      });
      TrackPlayer.addEventListener(Event.PlaybackError, e => {
        console.log(e.message);
      });
    })();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      await TrackPlayer.setupPlayer().then(() => {
        TrackPlayer.updateOptions({
          capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
          ],
        });
      });

      TrackPlayer.registerPlaybackService(() => trackPlayerServices);
    })();
  }, [trackPlayerServices]);

  return null;
};

export default InitPlayerConfig;
