import {FC} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

type Song = {
  img: string;
  title: string;
  desc: string;
};

type Props = {
  list: Song[];
};

const Playlist: FC<Props> = ({list}: Props) => {
  return (
    <View style={styles.playListBox}>
      {list.map((item, index) => (
        <View style={styles.playListItem} key={index}>
          <View style={styles.playListItemBackGround}>
            <Image
              style={styles.homeImage}
              source={{
                uri: item.img,
              }}
            />
          </View>
          <Text style={{marginTop: 10}} numberOfLines={1}>
            {item.title}
          </Text>
          <Text numberOfLines={1}>{item.desc}</Text>
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
