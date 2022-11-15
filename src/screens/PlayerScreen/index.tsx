import {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import TrackPlayer, {
  type Track,
  useTrackPlayerEvents,
  Event,
  State,
  useProgress,
  RepeatMode,
} from 'react-native-track-player';
import {LinearProgress, BottomSheet, ListItem, Image} from '@rneui/themed';
import {BlurView} from '@react-native-community/blur';

import ClickButtonWithIcon from '@/components/ClickButtonWithIcon';
import {ICON_GRAY, ICON_BLACK} from '@/constants/color';
import {ListContainer} from '@/components/StyledContainer';
import {ScreenHeight} from '@/constants/dimension';
import {MAIN_COLOR} from '@/constants/color';

import {RootStackParamList} from '@/types';

type Props = {} & NativeStackScreenProps<RootStackParamList, 'Player'>;

const events = [Event.PlaybackState, Event.PlaybackError, Event.PlaybackTrackChanged];

const repeatModeMap = {
  [RepeatMode.Off]: 'shuffle-outline',
  [RepeatMode.Track]: 'sync-outline',
  [RepeatMode.Queue]: 'repeat-outline',
};

const PlayerScreen = ({route, navigation}: Props) => {
  const {id, tracks} = route.params;
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [playerState, setPlayerState] = useState<State | null>(null);
  const {position, duration} = useProgress();
  const [currentQueue, setCurrentQueue] = useState<[] | Track[]>([]);
  const [playlistVisible, setPlaylistVisible] = useState<boolean>(false);
  const [repeatMode, setRepeatMode] = useState(RepeatMode.Off);
  useEffect(() => {
    (async () => {
      if (id && tracks.length) {
        try {
          await TrackPlayer.reset();
          await TrackPlayer.add(tracks);
          const index = tracks.findIndex(item => item.id === id) || 0;
          await TrackPlayer.skip(index);
          const nowTrack = await TrackPlayer.getTrack(index);
          await TrackPlayer.play();
          const queue = await TrackPlayer.getQueue();
          const mode = await TrackPlayer.getRepeatMode();
          setCurrentQueue(queue);
          setCurrentTrack(nowTrack);
          setRepeatMode(mode);
        } catch (error) {
          console.error(error);
        }
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

  const togglePlaylist = () => {
    setPlaylistVisible(true);
  };

  const handleSkipTrack = async (track: Track) => {
    const index = currentQueue.findIndex(item => item.id === track.id);
    await TrackPlayer.skip(index);
    setCurrentTrack(track);
    setPlaylistVisible(false);
  };

  const changeRepeatMode = async () => {
    const repeat = await TrackPlayer.getRepeatMode();
    console.log(repeat);
    const repeatModeList = [RepeatMode.Off, RepeatMode.Track, RepeatMode.Queue];
    const nextRepeatMode = repeatModeList[(repeat + 1) % 3];
    await TrackPlayer.setRepeatMode(nextRepeatMode);
    setRepeatMode(nextRepeatMode);
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
          icon="ellipsis-horizontal-outline"
          color={ICON_GRAY}
          onPress={() => {}}
        />
      </ListContainer>
      <BottomSheet
        modalProps={{}}
        isVisible={playlistVisible}
        onBackdropPress={() => setPlaylistVisible(false)}>
        <BlurView
          blurType="dark"
          blurAmount={10}
          reducedTransparencyFallbackColor="black"
          style={{width: '100%', height: ScreenHeight - 200}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              ...styles.playlistItemContainer,
            }}>
            <Text style={{color: 'white', fontSize: 16}}>顺序播放({currentQueue.length}首)</Text>
          </View>
          <ScrollView>
            {currentQueue.map((track, i) => (
              <ListItem
                key={i}
                onPress={() => handleSkipTrack(track)}
                containerStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  ...styles.playlistItemContainer,
                }}>
                <ListItem.Content style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <ListItem.Title
                    style={
                      track.url === currentTrack?.url ? styles.activeTitle : styles.normalTitle
                    }>
                    {track.title}
                    <Text
                      style={
                        track.url === currentTrack?.url ? styles.activeArtist : styles.normalArtist
                      }>
                      {`(${track.artist})`}
                    </Text>
                  </ListItem.Title>
                  <ClickButtonWithIcon
                    size={20}
                    icon="close-outline"
                    color="white"
                    onPress={() => {}}
                  />
                </ListItem.Content>
              </ListItem>
            ))}
          </ScrollView>
          <View style={{height: 100, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white', fontSize: 16}}>关闭</Text>
          </View>
        </BlurView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({
  playlistItemContainer: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(244, 244, 244, 0.2)',
    paddingLeft: 20,
    paddingRight: 20,
  },
  normalTitle: {
    color: 'white',
    fontSize: 14,
    flex: 1,
  },
  activeTitle: {
    color: MAIN_COLOR,
    fontSize: 14,
    flex: 1,
  },
  normalArtist: {
    color: 'rgba(244, 244, 244, 0.6)',
    fontSize: 12,
  },
  activeArtist: {
    color: MAIN_COLOR,
    fontSize: 12,
  },
});
