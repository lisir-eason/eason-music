import {useRef, useEffect, useState} from 'react';
import {View, Text, Animated, StyleSheet, Image, Pressable} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import HeaderChangeScrollView from '@/components/HeaderChangeScrollView';
import {PlaylistInfoBox, ListContainer} from '@/components/StyledContainer';
import {H2, H3} from '@/components/StyledComponent';
import ClickButtonWithIcon from '@/components/ClickButtonWithIcon';
import {RootStackParamList, SongUrl} from '@/types';
import {getPlaylistDetail} from '@/apis/playlist';
import {getSongUrls} from '@/apis/song';
import {ICON_GRAY} from '@/constants/color';

type Props = NativeStackScreenProps<RootStackParamList, 'Playlist'>;

type Author = {
  id: number;
  name: string;
};
type trackProps = {
  id: number;
  name: string;
  al: {name: string; id: number; picUrl: string};
  ar: Author[];
};
type PlaylistInfoProps = null | {
  name: string;
  coverImgUrl: string;
  description: string;
  updateFrequency: string | null;
  tracks: trackProps[];
};

const PlaylistScreen = ({route, navigation}: Props) => {
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

  const handlePlay = async (track: trackProps) => {
    const tracks = playlistInfo?.tracks;
    if (tracks) {
      try {
        const tracksId = tracks.map(item => item.id).join(',');
        const {data: urls} = await getSongUrls({id: tracksId, level: 'standard'});
        const data = urls.data as SongUrl[];
        const songTracks = data.map(item => {
          return {
            id: item.id,
            url: item.url && item.url.replace('http', 'https'),
            title: tracks.find(el => el.id === item.id)?.name,
            duration: item.time / 1000,
            artist: tracks
              .find(el => el.id === item.id)
              ?.ar.map(e => e.name)
              ?.join(','),
            artwork: tracks.find(el => el.id === item.id)?.al.picUrl.replace('http', 'https'),
          };
        });
        // await TrackPlayer.play();
        navigation.navigate('Player', {id: track.id, tracks: songTracks});
      } catch (error) {
        console.log(error);
      }
    }
  };

  const renderItem = playlistInfo?.tracks.map((item: trackProps, index: number) => {
    return (
      <Pressable style={styles.playlistItemContainer} key={index} onPress={() => handlePlay(item)}>
        <View style={styles.playlistItemIndexContainer}>
          <Text style={{fontSize: 16}}>{index + 1}</Text>
        </View>
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
          <ListContainer style={{marginTop: 290}}>
            {/* <FlatList data={playlistInfo?.tracks} renderItem={renderItem} /> */}
            {renderItem}
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
