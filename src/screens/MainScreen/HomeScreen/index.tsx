import {useState, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image, ScrollView} from 'react-native';
import {SearchBar} from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ButtonWithIcon from '@/components/ButtonWithIcon';
import Playlist from '@/components/Playlist';
import {getRecommendedPlaylist} from '@/apis/playlist';

import {PlayList, AllNavigationProps} from '@/types';

type Props = {} & AllNavigationProps;

const HomeScreen = ({navigation}: Props) => {
  const [search, setSearch] = useState<string>('');
  const [songList, setSongList] = useState<[] | PlayList[]>([]);
  const updateSearch = (value: string) => {
    setSearch(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRecommendedPlaylist({limit: 9});
        if (response.status === 200) {
          setSongList(response.data.result as PlayList[]);
        } else {
          throw new Error('拉取推荐歌单失败');
        }
      } catch (error) {
        if (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.logoText}>音乐</Text>
          <View style={styles.searchBar}>
            <SearchBar
              placeholder="搜索"
              platform="ios"
              onChangeText={updateSearch}
              value={search}
            />
          </View>
          <Ionicons name="fitness-outline" size={30} color="#000" />
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.homeImage}
            source={{
              uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
            }}
          />
        </View>
        <View style={styles.iconGroupList}>
          <ButtonWithIcon title="歌单" icon="list-circle-outline" />
          <ButtonWithIcon title="电台" icon="barcode-outline" />
          <ButtonWithIcon title="排行榜" icon="stats-chart-outline" />
          <ButtonWithIcon title="歌手" icon="people-outline" />
          <ButtonWithIcon title="视频彩铃" icon="videocam-outline" />
        </View>
        <View style={styles.recommendedPlaylist}>
          <View style={styles.recommendedPlaylistHeader}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>推荐歌单</Text>
            <Text>更多 {'>'}</Text>
          </View>
          <Playlist list={songList} navigation={navigation} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
  },
  searchBar: {
    flex: 1,
    margin: 10,
  },
  imageContainer: {
    height: 150,
    padding: 20,
    paddingTop: 0,
  },
  homeImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  iconGroupList: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
  },
  recommendedPlaylist: {
    padding: 20,
  },
  recommendedPlaylistHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
