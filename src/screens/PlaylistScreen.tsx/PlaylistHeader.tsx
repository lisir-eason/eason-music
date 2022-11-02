import React from 'react';
import {StyleSheet, Animated} from 'react-native';
import {MAIN_COLOR} from '@/constants/color';

type Props = {
  animHeaderValue: Animated.Value;
  headerHeight: number;
  maxHeaderHeight: number;
  scrollDistance: number;
};

const PlaylistHeader = ({
  animHeaderValue,
  headerHeight,
  maxHeaderHeight,
  scrollDistance,
}: Props) => {
  const animatedHeaderHeight = animHeaderValue.interpolate({
    inputRange: [0, scrollDistance],
    outputRange: [maxHeaderHeight, headerHeight],
    extrapolate: 'clamp',
  });

  console.log(headerHeight);

  return (
    <Animated.View style={[styles.header, {height: animatedHeaderHeight}]}>
      {/* <Text style={styles.headerText}></Text> */}
    </Animated.View>
  );
};

export default PlaylistHeader;

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    paddingTop: 10,
    backgroundColor: MAIN_COLOR,
  },
  headerText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'center',
  },
});
