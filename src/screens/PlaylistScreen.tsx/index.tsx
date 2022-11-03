import {useRef, useEffect, useState} from 'react';
import {View, Text, Animated, StyleSheet, Image, FlatList} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import HeaderChangeScrollView from '@/components/HeaderChangeScrollView';
import {PlaylistInfoBox, ListContainer} from '@/components/StyledContainer';
import {H2, H3} from '@/components/StyledComponent';
import {RootStackParamList} from '@/types';
import {getPlaylistDetail} from '@/apis/playlist';

type Props = NativeStackScreenProps<RootStackParamList, 'Playlist'>;
type trackProps = {
  name: string;
  al: {name: string; id: number; picUrl: string};
};
type PlaylistInfoProps = null | {
  name: string;
  coverImgUrl: string;
  description: string;
  updateFrequency: string | null;
  tracks: trackProps[];
};

const PlaylistScreen = ({route}: Props) => {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const [playlistInfo, setPlaylistInfo] = useState<PlaylistInfoProps>(null);
  const Max_Header_Height = 250;
  const {id} = route.params;

  useEffect(() => {
    if (id) {
      getPlaylistDetail({id}).then(res => {
        if (res) {
          const {playlist} = res.data;

          setPlaylistInfo(playlist);
        }
      });
    }
  }, [id]);

  const renderItem = ({item}: {item: trackProps}) => (
    <View style={{height: 40}}>
      <Text>{item.al.name}</Text>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <HeaderChangeScrollView
        title={playlistInfo?.name}
        maxHeaderHeight={Max_Header_Height}
        animHeaderValue={scrollOffsetY}>
        <>
          <PlaylistInfoBox>
            <View style={styles.leftInfoContainer}>
              <H2 numberOfLines={1}>{playlistInfo?.updateFrequency || '每周更新'}</H2>
              <H3 numberOfLines={1}>{playlistInfo?.name}</H3>
              <Text style={{color: '#fff'}} numberOfLines={3}>
                {playlistInfo?.description}
              </Text>
            </View>
            <Image style={styles.playlistCoverImage} source={{uri: playlistInfo?.coverImgUrl}} />
          </PlaylistInfoBox>
          <ListContainer style={{marginTop: 270}}>
            <FlatList
              data={playlistInfo?.tracks}
              renderItem={renderItem}
              keyExtractor={item => item.al.id}
            />
          </ListContainer>
        </>
      </HeaderChangeScrollView>
    </View>
  );
};

export default PlaylistScreen;

const styles = StyleSheet.create({
  scrollText: {padding: 30},
  leftInfoContainer: {
    flex: 1,
  },
  playlistCoverImage: {
    width: 130,
    height: 130,
    borderRadius: 5,
  },
});
