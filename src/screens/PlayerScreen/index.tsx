import {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import TrackPlayer, {
  type Track,
  useTrackPlayerEvents,
  Event,
  State,
  useProgress,
} from 'react-native-track-player';
import {LinearProgress} from '@rneui/themed';

import ClickButtonWithIcon from '@/components/ClickButtonWithIcon';
import {ICON_GRAY, ICON_BLACK} from '@/constants/color';
import {ListContainer} from '@/components/StyledContainer';

import {RootStackParamList} from '@/types';

type Props = {} & NativeStackScreenProps<RootStackParamList, 'Player'>;

const events = [Event.PlaybackState, Event.PlaybackError, Event.PlaybackTrackChanged];

const PlayerScreen = ({route}: Props) => {
  const {id, tracks} = route.params;
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [playerState, setPlayerState] = useState<State | null>(null);
  const {position, duration} = useProgress();
  const [currentQueue, setCurrentQueue] = useState<[] | Track[]>([]);
  useEffect(() => {
    (async () => {
      if (id) {
        await TrackPlayer.add(tracks);
        const index = tracks.findIndex(item => item.id === id);
        await TrackPlayer.skip(index);
        const nowTrack = await TrackPlayer.getTrack(index);
        await TrackPlayer.play();
        const queue = await TrackPlayer.getQueue();
        setCurrentQueue(queue);
        setCurrentTrack(nowTrack);
      }
    })();
  }, [id, tracks]);

  useTrackPlayerEvents(events, async event => {
    if (event.type === Event.PlaybackError) {
      console.warn('An error occur while playing the current track.');
    }
    if (event.type === Event.PlaybackState) {
      setPlayerState(event.state);
    }
    if (event.type === Event.PlaybackTrackChanged) {
      const nowIndex = await TrackPlayer.getCurrentTrack();
      if (nowIndex !== null) {
        const nowTrack = await TrackPlayer.getTrack(nowIndex);
        setCurrentTrack(nowTrack);
      }
    }
  });

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
    if (currentIndex === 0 || currentIndex === null) {
      return;
    }
    await TrackPlayer.skipToPrevious();
    const nowIndex = await TrackPlayer.getCurrentTrack();
    if (nowIndex !== null) {
      const nowTrack = await TrackPlayer.getTrack(nowIndex);
      setCurrentTrack(nowTrack);
    }
  };

  const handleNext = async () => {
    const currentIndex = await TrackPlayer.getCurrentTrack();
    if (currentIndex === currentQueue.length - 1 || currentIndex === null) {
      return;
    }
    await TrackPlayer.skipToNext();
    const nowIndex = await TrackPlayer.getCurrentTrack();
    if (nowIndex !== null) {
      const nowTrack = await TrackPlayer.getTrack(nowIndex);
      setCurrentTrack(nowTrack);
    }
  };

  return (
    <SafeAreaView style={{justifyContent: 'space-between', alignItems: 'center', height: '100%'}}>
      <ListContainer style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <ClickButtonWithIcon
          size={30}
          icon="chevron-down-outline"
          color={ICON_GRAY}
          onPress={() => {}}
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
        <ClickButtonWithIcon size={30} icon="repeat-outline" color={ICON_GRAY} onPress={() => {}} />
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
        <ClickButtonWithIcon size={30} icon="list-outline" color={ICON_GRAY} onPress={() => {}} />
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
          icon="ellipsis-horizontal-outline"
          color={ICON_GRAY}
          onPress={() => {}}
        />
      </ListContainer>
    </SafeAreaView>
  );
};

export default PlayerScreen;
