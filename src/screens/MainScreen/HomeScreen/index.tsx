import {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable} from 'react-native';
import {SearchBar, Image} from '@rneui/themed';
import Highlighter from '@javier.alejandro.castro/react-native-highlight-words';

import ButtonWithIcon from '@/components/ButtonWithIcon';
import Playlist from '@/components/Playlist';
import {getRecommendedPlaylist} from '@/apis/playlistApi';
import PlayerBox from '@/components/PlayerBox';
import {PlayList, AllNavigationProps, ResponseTrackProps, ResponseArtistProps} from '@/types';
import {getHotSearch, getSearchSuggest, searchKeywords} from '@/apis/searchApi';
import {useDebounce} from '@/hooks/CustomHooks';
import {MAIN_COLOR} from '@/constants/color';
import SongList from '@/components/SongList';
import ArtistsList from '@/components/ArtistsList';

type Props = {} & AllNavigationProps;

const HomeScreen = ({navigation}: Props) => {
  const [search, setSearch] = useState<string>('');
  const debSearch = useDebounce(search, 400);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [playList, setPlaylist] = useState<[] | PlayList[]>([]);
  const [mode, setMode] = useState<'home' | 'search' | 'result'>('home');
  const [searchList, setSearchList] = useState<string[]>([]);
  const [tracksList, setTracksList] = useState<ResponseTrackProps[]>([]);
  const [artistList, setArtistList] = useState<ResponseArtistProps[]>([]);
  const updateSearchList = (value: string) => {
    setSearch(value);
  };

  const fetchRecommendedPlaylist = () => {
    getRecommendedPlaylist({limit: 9}).then(res => {
      setPlaylist(res.data.result as PlayList[]);
    });
  };

  const fetchHotsList = () => {
    getHotSearch().then(res => {
      const hotsList = res.data.result.hots.map((item: {first: string}) => item.first);
      setSearchList(hotsList as string[]);
    });
  };

  const fetchSuggestList = useCallback(() => {
    setSearchLoading(true);
    getSearchSuggest(debSearch)
      .then(res => {
        let artists: string[] = [];
        let songs: string[] = [];
        const artistsList = res.data.result.artists as {name: string}[] | undefined;
        const songsList = res.data.result.songs as
          | {name: string; artists: {name: string}[]}[]
          | undefined;
        if (artistsList) {
          artists = artistsList.map(item => item.name);
        }
        if (songsList) {
          songs = songsList?.map(item => `${item.name} ${item.artists[0].name}`);
        }
        const results = artists.concat(songs);
        setSearchList(results);
      })
      .finally(() => {
        setSearchLoading(false);
      });
  }, [debSearch]);

  useEffect(() => {
    if (debSearch) {
      fetchSuggestList();
    } else {
      fetchHotsList();
    }
  }, [debSearch, fetchSuggestList]);

  useEffect(() => {
    fetchRecommendedPlaylist();
    fetchHotsList();
  }, []);

  const handleSearch = (keyword: string) => {
    setMode('result');
    setSearchLoading(true);
    if (keyword !== search) {
      setSearch(keyword);
    }
    Promise.all([
      searchKeywords({keywords: keyword, limit: 3, type: '100'}),
      searchKeywords({keywords: keyword, limit: 20}),
    ])
      .then(res => {
        const [artistsRes, songsRes] = res;
        const artistsList = artistsRes.data.result.artists as ResponseArtistProps[];
        const songsList = songsRes.data.result.songs as ResponseTrackProps[];
        setTracksList(songsList);
        setArtistList(artistsList);
      })
      .finally(() => {
        setSearchLoading(false);
      });
  };

  useEffect(() => {
    if (mode !== 'result') {
      setArtistList([]);
      setTracksList([]);
    }
  }, [mode]);

  const handleCancel = () => {
    setMode('home');
  };

  const renderContent = () => {
    if (mode === 'home') {
      return (
        <View style={{paddingLeft: 20, paddingRight: 20}}>
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
          <View>
            <View style={styles.recommendedPlaylistHeader}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>推荐歌单</Text>
              <Text>更多 {'>'}</Text>
            </View>
            <Playlist list={playList} navigation={navigation} />
          </View>
        </View>
      );
    }
    if (mode === 'search') {
      return (
        <View style={{paddingLeft: 30, paddingRight: 30}}>
          {searchList.map((item, index) => (
            <Pressable
              style={{
                height: 40,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '100%',
              }}
              key={index}
              onPress={() => {
                handleSearch(item);
              }}>
              <ButtonWithIcon icon="search-outline" size={18} />
              <Highlighter
                highlightStyle={{color: MAIN_COLOR}}
                searchWords={[debSearch]}
                textToHighlight={item}
                style={{fontSize: 18, marginLeft: 5}}
              />
            </Pressable>
          ))}
        </View>
      );
    }
    if (mode === 'result') {
      return (
        <View style={{paddingLeft: 30, paddingRight: 30}}>
          {artistList.length !== 0 && (
            <View>
              <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>歌手</Text>
              <ArtistsList artists={artistList} showIndex={false} />
            </View>
          )}
          {tracksList.length !== 0 && (
            <View>
              <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10, marginTop: 10}}>
                单曲
              </Text>
              <SongList tracks={tracksList} showIndex={false} />
            </View>
          )}
        </View>
      );
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            {mode === 'home' && (
              <View style={{paddingRight: 10}}>
                <Text style={styles.logoText}>Eason</Text>
              </View>
            )}
            <View style={styles.searchBar}>
              <SearchBar
                placeholder="搜索"
                platform="ios"
                onChangeText={updateSearchList}
                value={search}
                cancelButtonTitle="取消"
                onFocus={() => {
                  setMode('search');
                }}
                showCancel={true}
                onCancel={handleCancel}
                cancelButtonProps={{color: '#000'}}
                showLoading={searchLoading}
              />
            </View>
          </View>
          {renderContent()}
        </ScrollView>
        <PlayerBox />
      </SafeAreaView>
    </>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10,
    flexDirection: 'row',
  },
  searchBar: {
    flex: 1,
  },
  imageContainer: {
    height: 150,
    marginBottom: 20,
  },
  homeImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  iconGroupList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  recommendedPlaylistHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
