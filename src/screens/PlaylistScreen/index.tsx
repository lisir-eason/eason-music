import {useRef, useEffect, useState} from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Image} from '@rneui/themed';

import HeaderChangeScrollView from '@/components/HeaderChangeScrollView';
import {PlaylistInfoBox, ListContainer} from '@/components/StyledContainer';
import {H2, H3} from '@/components/StyledComponent';
import {RootStackParamList, ResponsePlaylistProps} from '@/types';
import {getPlaylistDetail} from '@/apis/playlistApi';
import SkeletonWithLinear from '@/components/SkeletonWithLinear';
import SongList from '@/components/SongList';

type Props = NativeStackScreenProps<RootStackParamList, 'Playlist'>;

const PlaylistScreen = ({route}: Props) => {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const [playlistInfo, setPlaylistInfo] = useState<ResponsePlaylistProps>(null);
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

  const renderSkeleton = () => {
    const skeletons = [];
    for (let i = 0; i < 10; i++) {
      skeletons.push(
        <View style={styles.playlistItemContainer} key={i}>
          <SkeletonWithLinear style={{height: 32, flex: 1, marginRight: 10}} />
          <SkeletonWithLinear width={32} height={32} circle />
          <SkeletonWithLinear
            style={{marginLeft: 10, marginRight: 10}}
            width={32}
            height={32}
            circle
          />
          <SkeletonWithLinear width={32} height={32} circle />
        </View>,
      );
    }

    return skeletons;
  };

  return (
    <View style={{flex: 1}}>
      <HeaderChangeScrollView
        title={playlistInfo?.name}
        maxHeaderHeight={Max_Header_Height}
        animHeaderValue={scrollOffsetY}>
        <>
          <PlaylistInfoBox>
            {playlistInfo?.tracks.length ? (
              <View style={styles.leftInfoContainer}>
                <H2 numberOfLines={1}>{playlistInfo?.updateFrequency || '每周更新'}</H2>
                <H3 numberOfLines={1}>{playlistInfo?.name}</H3>
                <Text style={{color: '#fff'}} numberOfLines={3}>
                  {playlistInfo?.description}
                </Text>
              </View>
            ) : (
              <SkeletonWithLinear style={styles.leftInfoContainer} height={130} />
            )}
            {playlistInfo?.tracks.length ? (
              <Image style={styles.playlistCoverImage} source={{uri: playlistInfo?.coverImgUrl}} />
            ) : (
              <SkeletonWithLinear style={styles.playlistCoverImage} />
            )}
          </PlaylistInfoBox>
          <ListContainer style={{marginTop: 290}}>
            {playlistInfo?.tracks.length ? (
              <SongList tracks={playlistInfo.tracks} />
            ) : (
              renderSkeleton()
            )}
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
    marginRight: 20,
    flex: 1,
    height: 130,
    justifyContent: 'center',
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
});
