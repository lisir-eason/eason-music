import {useEffect, useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import TrackPlayer, {State, useProgress, RepeatMode} from 'react-native-track-player';
import {LinearProgress, Image} from '@rneui/themed';
import {showMessage} from 'react-native-flash-message';

import ClickButtonWithIcon from '@/components/ClickButtonWithIcon';
import {ICON_GRAY, ICON_BLACK} from '@/constants/color';
import {ListContainer} from '@/components/StyledContainer';
import PlaylistSheet, {modeMap} from './PlaylistSheet';
import LyricSheet from './LyricSheet';
import {RootStackParamList} from '@/types';
import {updateCurrentQueue, updateRepeatMode, updateCurrentTrack} from '@/store/PlayerSlice';
import {useAppDispatch, useAppSelector} from '@/hooks/ReduxToolkit';
import {MAIN_COLOR} from '../../constants/color';

type Props = {} & NativeStackScreenProps<RootStackParamList, 'Player'>;

const repeatModeMap = {
  [RepeatMode.Off]: 'shuffle-outline',
  [RepeatMode.Track]: 'sync-outline',
  [RepeatMode.Queue]: 'repeat-outline',
};

const PlayerScreen = ({route, navigation}: Props) => {
  const id = route.params?.id;
  const tracks = route.params?.tracks;
  const {position, duration} = useProgress();
  const currentTrack = useAppSelector(state => state.player.currentTrack);
  const currentQueue = useAppSelector(state => state.player.currentQueue);
  const playerState = useAppSelector(state => state.player.state);
  const repeatMode = useAppSelector(state => state.player.repeatMode);
  const [playlistVisible, setPlaylistVisible] = useState<boolean>(false);
  const [lyricVisible, setLyricVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      if (id && tracks?.length) {
        try {
          await TrackPlayer.reset();
          await TrackPlayer.add(tracks);
          dispatch(updateCurrentQueue(tracks));
          const index = tracks.findIndex(item => item.id === id) || 0;
          const track = tracks.find(item => item.id === id) || tracks[0];
          await TrackPlayer.skip(index);
          dispatch(updateCurrentTrack(track));
          await TrackPlayer.play();
          const mode = await TrackPlayer.getRepeatMode();
          dispatch(updateRepeatMode(mode));
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, [dispatch, id, tracks]);

  const convertTime = (second: number | undefined) => {
    if (!second) {
      return '00:00';
    }
    const intSecond = parseInt(second.toString(), 10);
    const minutes = Math.floor(intSecond / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (intSecond % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handlePlay = async () => {
    if (playerState === State.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  const handlePrevious = async () => {
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
  };

  const handleNext = async () => {
    const currentIndex = await TrackPlayer.getCurrentTrack();
    const currentModel = await TrackPlayer.getRepeatMode();
    if (currentIndex === null) {
      return;
    }
    if (
      currentIndex === currentQueue.length - 1 &&
      (currentModel === RepeatMode.Off || currentModel === RepeatMode.Track)
    ) {
      showMessage({
        message: '已经是最后一首歌了!',
        type: 'danger',
      });
      return;
    }
    await TrackPlayer.skipToNext();
  };

  const togglePlaylist = () => {
    setPlaylistVisible(true);
  };

  const changeRepeatMode = async () => {
    const repeat = await TrackPlayer.getRepeatMode();
    const repeatModeList = [RepeatMode.Off, RepeatMode.Track, RepeatMode.Queue];
    const nextRepeatMode = repeatModeList[(repeat + 1) % 3];
    await TrackPlayer.setRepeatMode(nextRepeatMode);
    showMessage({
      message: modeMap[nextRepeatMode],
      type: 'info',
      backgroundColor: MAIN_COLOR,
    });
    dispatch(updateRepeatMode(nextRepeatMode));
  };

  return (
    <SafeAreaView style={{justifyContent: 'space-between', alignItems: 'center', height: '100%'}}>
      <ListContainer style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <ClickButtonWithIcon
          size={30}
          icon="chevron-down-outline"
          color={ICON_GRAY}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <ClickButtonWithIcon
          size={30}
          icon="ellipsis-horizontal-outline"
          color={ICON_GRAY}
          onPress={() => {}}
        />
        <ClickButtonWithIcon size={30} icon="share-outline" color={ICON_GRAY} onPress={() => {}} />
      </ListContainer>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Image
          style={{width: 300, height: 300, borderRadius: 150}}
          source={{uri: currentTrack?.artwork as string | undefined}}
        />
      </View>
      <View style={{alignItems: 'center', marginBottom: 25}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
          {currentTrack?.title}
        </Text>
        <Text>{currentTrack?.artist}</Text>
      </View>
      <ListContainer
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 30,
          marginBottom: 30,
        }}>
        <ClickButtonWithIcon
          size={30}
          icon={repeatModeMap[repeatMode]}
          color={ICON_GRAY}
          onPress={changeRepeatMode}
        />
        <ClickButtonWithIcon
          size={25}
          icon="play-skip-back-outline"
          color={ICON_BLACK}
          onPress={handlePrevious}
        />
        <ClickButtonWithIcon
          size={30}
          icon={playerState === State.Playing ? 'pause-outline' : 'play-outline'}
          color={ICON_BLACK}
          onPress={handlePlay}
        />
        <ClickButtonWithIcon
          size={25}
          icon="play-skip-forward-outline"
          color={ICON_BLACK}
          onPress={handleNext}
        />
        <ClickButtonWithIcon
          size={30}
          icon="list-outline"
          color={ICON_GRAY}
          onPress={togglePlaylist}
        />
      </ListContainer>
      <ListContainer
        style={{flexDirection: 'row', alignItems: 'center', marginTop: 25, marginBottom: 25}}>
        <Text>{convertTime(position)}</Text>
        <LinearProgress
          value={position / duration}
          animation={false}
          style={{flex: 1, marginLeft: 10, marginRight: 10}}
          color="red"
        />
        <Text>{convertTime(duration)}</Text>
      </ListContainer>
      <ListContainer
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 25,
          marginBottom: 25,
        }}>
        <ClickButtonWithIcon size={30} icon="heart-outline" color={ICON_GRAY} onPress={() => {}} />
        <ClickButtonWithIcon
          size={30}
          icon="chatbox-outline"
          color={ICON_GRAY}
          onPress={() => {}}
        />
        <ClickButtonWithIcon
          size={30}
          icon="arrow-down-outline"
          color={ICON_GRAY}
          onPress={() => {}}
        />
        <ClickButtonWithIcon
          size={30}
          icon="notifications-outline"
          color={ICON_GRAY}
          onPress={() => {}}
        />
        <ClickButtonWithIcon
          size={30}
          icon="list-circle-outline"
          color={ICON_GRAY}
          onPress={() => {
            setLyricVisible(true);
          }}
        />
      </ListContainer>
      <PlaylistSheet isVisible={playlistVisible} setPlaylistVisible={setPlaylistVisible} />
      <LyricSheet isVisible={lyricVisible} setVisible={setLyricVisible} />
    </SafeAreaView>
  );
};

export default PlayerScreen;
