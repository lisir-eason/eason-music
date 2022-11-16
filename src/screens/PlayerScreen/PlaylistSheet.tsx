import {type Dispatch, SetStateAction} from 'react';
import {BottomSheet, ListItem} from '@rneui/themed';
import {BlurView} from '@react-native-community/blur';
import {StyleSheet, View, Text, ScrollView, Pressable} from 'react-native';
import {type Track} from 'react-native-track-player';

import {ScreenHeight} from '@/constants/dimension';
import ClickButtonWithIcon from '@/components/ClickButtonWithIcon';
import {MAIN_COLOR} from '@/constants/color';

type Props = {
  isVisible: boolean;
  setPlaylistVisible: Dispatch<SetStateAction<boolean>>;
  currentTrack: Track | null;
  currentQueue: [] | Track[];
  handleSkipTrack: (track: Track) => Promise<void>;
};

const PlaylistSheet = ({
  isVisible,
  setPlaylistVisible,
  currentTrack,
  currentQueue,
  handleSkipTrack,
}: Props) => {
  return (
    <BottomSheet isVisible={isVisible} onBackdropPress={() => setPlaylistVisible(false)}>
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
                  style={track.url === currentTrack?.url ? styles.activeTitle : styles.normalTitle}>
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
        <Pressable
          style={{height: 100, justifyContent: 'center', alignItems: 'center'}}
          onPress={() => setPlaylistVisible(false)}>
          <Text style={{color: 'white', fontSize: 16}}>关闭</Text>
        </Pressable>
      </BlurView>
    </BottomSheet>
  );
};

export default PlaylistSheet;

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
