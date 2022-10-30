import {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image, ScrollView} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {SearchBar} from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonWithIcon from '@/components/ButtonWithIcon';
import Playlist from '@/components/PlaylistItem';

type Props = NativeStackScreenProps<RootStackParamList, '音乐'>;

const HomeScreen = ({}: Props) => {
  const [search, setSearch] = useState<string>('');
  const updateSearch = (value: string) => {
    setSearch(value);
  };
  const songList = [
    {
      img: 'https://is5-ssl.mzstatic.com/image/thumb/Music69/v4/ae/fe/97/aefe975b-08f9-4bdb-d05a-491ade09a926/dj.emhqpwbp.jpg/1200x1200bf-60.jpg',
      title: '热门歌曲影视推荐',
      desc: '精选推荐',
    },
    {
      img: 'https://is5-ssl.mzstatic.com/image/thumb/Music69/v4/ae/fe/97/aefe975b-08f9-4bdb-d05a-491ade09a926/dj.emhqpwbp.jpg/1200x1200bf-60.jpg',
      title: '热门歌曲影视推荐',
      desc: '精选推荐',
    },
    {
      img: 'https://is5-ssl.mzstatic.com/image/thumb/Music69/v4/ae/fe/97/aefe975b-08f9-4bdb-d05a-491ade09a926/dj.emhqpwbp.jpg/1200x1200bf-60.jpg',
      title: '热门歌曲影视推荐',
      desc: '精选推荐',
    },
    {
      img: 'https://is5-ssl.mzstatic.com/image/thumb/Music69/v4/ae/fe/97/aefe975b-08f9-4bdb-d05a-491ade09a926/dj.emhqpwbp.jpg/1200x1200bf-60.jpg',
      title: '热门歌曲影视推荐',
      desc: '精选推荐',
    },
    {
      img: 'https://is5-ssl.mzstatic.com/image/thumb/Music69/v4/ae/fe/97/aefe975b-08f9-4bdb-d05a-491ade09a926/dj.emhqpwbp.jpg/1200x1200bf-60.jpg',
      title: '热门歌曲影视推荐',
      desc: '精选推荐',
    },
    {
      img: 'https://is5-ssl.mzstatic.com/image/thumb/Music69/v4/ae/fe/97/aefe975b-08f9-4bdb-d05a-491ade09a926/dj.emhqpwbp.jpg/1200x1200bf-60.jpg',
      title: '热门歌曲影视推荐',
      desc: '精选推荐',
    },
    {
      img: 'https://is5-ssl.mzstatic.com/image/thumb/Music69/v4/ae/fe/97/aefe975b-08f9-4bdb-d05a-491ade09a926/dj.emhqpwbp.jpg/1200x1200bf-60.jpg',
      title: '热门歌曲影视推荐',
      desc: '精选推荐',
    },
    {
      img: 'https://is5-ssl.mzstatic.com/image/thumb/Music69/v4/ae/fe/97/aefe975b-08f9-4bdb-d05a-491ade09a926/dj.emhqpwbp.jpg/1200x1200bf-60.jpg',
      title: '热门歌曲影视推荐',
      desc: '精选推荐',
    },
    {
      img: 'https://is5-ssl.mzstatic.com/image/thumb/Music69/v4/ae/fe/97/aefe975b-08f9-4bdb-d05a-491ade09a926/dj.emhqpwbp.jpg/1200x1200bf-60.jpg',
      title: '热门歌曲影视推荐',
      desc: '精选推荐',
    },
  ];

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
          <Playlist list={songList} />
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
