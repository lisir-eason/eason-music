import {useRef} from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import PlaylistHeader from './PlaylistHeader';
import HeaderChangeScrollView from '@/components/HeaderChangeScrollView';
import {AllNavigationProps} from '@/types';

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

type Props = NativeStackScreenProps<AllNavigationProps>;

const PlaylistScreen = ({}: Props) => {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const Max_Header_Height = 200;

  return (
    <View style={{flex: 1}}>
      <PlaylistHeader animHeaderValue={scrollOffsetY} maxHeaderHeight={Max_Header_Height}>
        <Text>hello</Text>
      </PlaylistHeader>
      <HeaderChangeScrollView
        title="Playlist"
        maxHeaderHeight={Max_Header_Height}
        animHeaderValue={scrollOffsetY}>
        {DATA.map(book => {
          return (
            <Text style={styles.scrollText} key={book.id}>
              {book.title}
            </Text>
          );
        })}
      </HeaderChangeScrollView>
    </View>
  );
};

export default PlaylistScreen;

const styles = StyleSheet.create({
  scrollText: {padding: 30},
});
