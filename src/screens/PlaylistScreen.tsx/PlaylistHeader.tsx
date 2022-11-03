import React, {PropsWithChildren} from 'react';
import {StyleSheet, Animated} from 'react-native';
import {MAIN_COLOR} from '@/constants/color';
import {useHeaderHeight} from '@react-navigation/elements';
import {AnimatedScroll} from '@/types';

type Props = {} & AnimatedScroll & PropsWithChildren;

const PlaylistHeader = ({animHeaderValue, maxHeaderHeight, children}: Props) => {
  const headerHeight = useHeaderHeight();
  const scrollDistance = maxHeaderHeight - headerHeight;

  const animatedHeaderHeight = animHeaderValue.interpolate({
    inputRange: [0, scrollDistance],
    outputRange: [maxHeaderHeight, headerHeight],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.header, {height: animatedHeaderHeight}]}>
      {children}
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
