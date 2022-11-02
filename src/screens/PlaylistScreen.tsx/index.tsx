import {FC, useRef, useEffect} from 'react';
import {View, Text, ScrollView, Animated, StyleSheet} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import PlaylistHeader from './PlaylistHeader';
import {RootStackParamList} from '@/types';
import {MAIN_COLOR} from '@/constants/color';

const DATA = [
  {
    id: 1,
    title: 'Modern JS: A curated collection',
  },
  {
    id: 2,
    title: 'JavaScript notes for professionals',
  },
  {
    id: 5,
    title: 'Exploring ES6',
  },
  {
    id: 6,
    title: 'JavaScript Enlightenment',
  },
  {
    id: 7,
    title: 'You dont know JS',
  },
  {
    id: 8,
    title: 'Learn JavaScript',
  },
  {
    id: 9,
    title: 'JavaScript succintly',
  },
  {
    id: 10,
    title: 'Human JavaScript',
  },
  {
    id: 11,
    title: 'JavaScript design patterns',
  },
  {
    id: 12,
    title: 'JS50: 50 illustrations in JS',
  },
  {
    id: 13,
    title: 'Eloqent JavaScript',
  },
  {
    id: 14,
    title: 'Practical ES6',
  },
  {
    id: 15,
    title: 'Speaking JavaScript',
  },
];

type Props = NativeStackScreenProps<RootStackParamList, 'Playlist'>;

const PlaylistScreen: FC<Props> = ({navigation}: Props) => {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const headerHeight = useHeaderHeight();
  const Max_Header_Height = 200;
  const Scroll_Distance = Max_Header_Height - headerHeight;

  const headerOpacity = scrollOffsetY.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    navigation.setOptions({
      headerBackground: () => (
        <Animated.View
          style={{
            backgroundColor: MAIN_COLOR,
            ...StyleSheet.absoluteFillObject,
            opacity: headerOpacity,
            height: 140,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 17, fontWeight: '500', color: '#fff'}}>Playlist</Text>
        </Animated.View>
      ),
      headerTransparent: true,
    });
  }, [headerOpacity, navigation]);

  return (
    <View style={{flex: 1}}>
      <PlaylistHeader
        animHeaderValue={scrollOffsetY}
        headerHeight={headerHeight}
        maxHeaderHeight={Max_Header_Height}
        scrollDistance={Scroll_Distance}
      />
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollOffsetY}}}], {
          useNativeDriver: false,
        })}>
        {DATA.map(book => {
          return (
            <Text style={styles.scrollText} key={book.id}>
              {book.title}
            </Text>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default PlaylistScreen;

const styles = StyleSheet.create({
  scrollText: {padding: 30},
});
