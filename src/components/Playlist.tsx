import {FC} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';

import {PlayList} from '@/types';
import {HomeScreenNavigationProp} from '@/screens/MainScreen/HomeScreen';

type Props = {
  list: PlayList[];
} & Pick<HomeScreenNavigationProp, 'navigation'>;

const Playlist: FC<Props> = ({list, navigation}: Props) => {
  return (
    <View style={styles.playListBox}>
      {list.map(item => (
        <Pressable
          onPress={() => {
            navigation.navigate('Playlist', {id: item.id});
          }}
          style={styles.playListItem}
          key={item.id}>
          <View style={styles.playListItemBackGround}>
            <Image
              style={styles.homeImage}
              source={{
                uri: item.picUrl,
              }}
            />
          </View>
          <Text style={{marginTop: 10}} numberOfLines={1}>
            {item.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default Playlist;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  homeImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  playListBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    flexWrap: 'wrap',
  },
  playListItem: {
    width: '30%',
    marginBottom: 10,
  },
  playListItemBackGround: {
    width: '100%',
    height: 110,
  },
});
