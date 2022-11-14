import {FC} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Image} from '@rneui/themed';

import {PlayList, AllNavigationProps} from '@/types';
import SkeletonWithLinear from '@/components/SkeletonWithLinear';

type Props = {
  list: PlayList[];
} & Pick<AllNavigationProps, 'navigation'>;

const Playlist: FC<Props> = ({list, navigation}: Props) => {
  const renderList = () => {
    return list.map(item => (
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
    ));
  };

  const renderSkeleton = () => {
    const skeletons = [];
    for (let i = 0; i < 9; i++) {
      skeletons.push(
        <View style={styles.playListItem} key={i}>
          <View style={styles.playListItemBackGround}>
            <SkeletonWithLinear height={110} />
          </View>
          <Text style={{marginTop: 10}} numberOfLines={1} />
        </View>,
      );
    }
    return skeletons;
  };

  return (
    <View style={styles.playListBox}>
      {list.length ? renderList() : renderSkeleton()}
      {}
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
