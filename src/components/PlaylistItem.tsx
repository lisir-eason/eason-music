import {FC} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import {PlayList} from '@/types';

type Props = {
  list: PlayList[];
};

const Playlist: FC<Props> = ({list}: Props) => {
  return (
    <View style={styles.playListBox}>
      {list.map(item => (
        <View style={styles.playListItem} key={item.id}>
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
        </View>
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
