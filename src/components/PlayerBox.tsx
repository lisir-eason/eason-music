import {Text, StyleSheet, Pressable} from 'react-native';
import {Image} from '@rneui/themed';
import TrackPlayer, {State} from 'react-native-track-player';
import {useNavigation} from '@react-navigation/native';

import {MAIN_COLOR} from '@/constants/color';
import ClickButtonWithIcon from '@/components/ClickButtonWithIcon';
import {useAppSelector} from '@/hooks/ReduxToolkit';
import {AllNavigationProps} from '@/types';

const PlayerBox = () => {
  const currentTrack = useAppSelector(state => state.player.currentTrack);
  const playerState = useAppSelector(state => state.player.state);
  const navigation = useNavigation<AllNavigationProps['navigation']>();

  const handlePlay = async () => {
    if (!currentTrack) {
      return;
    }
    if (playerState === State.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  const navigateToPlayerScreen = () => {
    if (currentTrack) {
      navigation.navigate('Player');
    }
  };

  return (
    <Pressable style={styles.playerBoxContainer} onPress={navigateToPlayerScreen}>
      <Image
        style={{width: 50, height: 50}}
        source={
          currentTrack
            ? {uri: currentTrack?.artwork as string | undefined}
            : require('../static/logo.png')
        }
      />
      <Text numberOfLines={1} style={{flex: 1, color: '#fff', marginLeft: 10, marginRight: 10}}>
        {currentTrack ? `${currentTrack?.title}-${currentTrack?.artist}` : '听你喜欢听 (*╹▽╹*)'}
      </Text>
      <ClickButtonWithIcon
        size={30}
        icon={playerState === State.Playing ? 'pause-outline' : 'play-outline'}
        color="#fff"
        onPress={handlePlay}
      />
    </Pressable>
  );
};

export default PlayerBox;

const styles = StyleSheet.create({
  playerBoxContainer: {
    height: 40,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: MAIN_COLOR,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingRight: 10,
  },
});
