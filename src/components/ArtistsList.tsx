import {Pressable, StyleSheet, View, Text} from 'react-native';
import {Image} from '@rneui/themed';
// import {useNavigation} from '@react-navigation/native';

import {ResponseArtistProps} from '@/types';

type Props = {
  artists: ResponseArtistProps[];
  showIndex?: boolean;
};

const ArtistsList = ({artists, showIndex = true}: Props) => {
  // const navigation = useNavigation<AllNavigationProps['navigation']>();

  const handlePlay = () => {};

  const renderItem = artists.map((item: ResponseArtistProps, index: number) => {
    return (
      <Pressable style={styles.playlistItemContainer} key={index} onPress={() => handlePlay()}>
        {showIndex && (
          <View style={styles.playlistItemIndexContainer}>
            <Text style={{fontSize: 16}}>{index + 1}</Text>
          </View>
        )}
        <Image
          style={{width: 32, height: 32, marginRight: 6, borderRadius: 16}}
          source={{uri: item.picUrl}}
        />
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{fontSize: 16, fontWeight: '400'}} numberOfLines={1}>
            {item.name}
          </Text>
        </View>
      </Pressable>
    );
  });

  return <>{renderItem}</>;
};

export default ArtistsList;

const styles = StyleSheet.create({
  playlistItemContainer: {
    height: 50,
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
