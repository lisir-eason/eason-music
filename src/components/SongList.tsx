import {Pressable, StyleSheet, View, Text} from 'react-native';
import {Image} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';

import {AllNavigationProps, CustomTrack, ResponseTrackProps, SongUrl} from '@/types';
import ClickButtonWithIcon from '@/components/ClickButtonWithIcon';
import {ICON_GRAY} from '@/constants/color';
import {getSongUrls} from '@/apis/songApi';

type Props = {
  tracks: ResponseTrackProps[];
  showIndex?: boolean;
};

const SongList = ({tracks, showIndex = true}: Props) => {
  const navigation = useNavigation<AllNavigationProps['navigation']>();

  const handlePlay = async (track: ResponseTrackProps) => {
    if (tracks) {
      try {
        const trackIdList = tracks.map(item => item.id);
        const tracksId = trackIdList.join(',');
        const {data: urls} = await getSongUrls({id: tracksId, level: 'standard'});
        const data = urls.data as SongUrl[];
        const result = trackIdList.map(item => {
          return data.find(el => el.id === item) || data[0];
        });

        const songTracks: CustomTrack[] = result
          .map(item => {
            return {
              id: item.id,
              url: (item.url && item.url.replace('http', 'https')) || '',
              title: tracks.find(el => el.id === item.id)?.name || '',
              duration: item.time / 1000,
              artist:
                tracks
                  .find(el => el.id === item.id)
                  ?.ar.map(e => e.name)
                  ?.join(',') || '',
              artwork:
                tracks.find(el => el.id === item.id)?.al.picUrl.replace('http', 'https') || '',
            };
          })
          .filter(el => el.url);
        navigation.navigate('Player', {id: track.id, tracks: songTracks});
      } catch (error) {
        console.error(error);
      }
    }
  };

  const renderItem = tracks.map((item: ResponseTrackProps, index: number) => {
    return (
      <Pressable style={styles.playlistItemContainer} key={index} onPress={() => handlePlay(item)}>
        {showIndex && (
          <View style={styles.playlistItemIndexContainer}>
            <Text style={{fontSize: 16}}>{index + 1}</Text>
          </View>
        )}
        <Image
          style={{width: 32, height: 32, marginRight: 6}}
          source={{uri: item.al.picUrl.replace('http', 'https')}}
        />
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{fontSize: 16, fontWeight: '400'}} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={{color: '#888888', fontSize: 14}} numberOfLines={1}>
            {item.ar.map(ar => ar.name).join('·')}
          </Text>
        </View>
        <ClickButtonWithIcon
          color={ICON_GRAY}
          size={23}
          icon="play-circle-outline"
          onPress={() => {}}
        />
        <ClickButtonWithIcon
          color={ICON_GRAY}
          size={23}
          icon="add-circle-outline"
          onPress={() => {}}
        />
        <ClickButtonWithIcon
          color={ICON_GRAY}
          size={23}
          icon="ellipsis-vertical-circle-outline"
          onPress={() => {}}
        />
      </Pressable>
    );
  });

  return <>{renderItem}</>;
};

export default SongList;

const styles = StyleSheet.create({
  playlistItemContainer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playlistItemIndexContainer: {
    width: 22,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
