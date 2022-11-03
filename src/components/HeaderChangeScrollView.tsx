import {useEffect, PropsWithChildren} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Animated, Text, StyleSheet, ScrollView} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import {MAIN_COLOR} from '@/constants/color';
import {AnimatedScroll} from '@/types';

type Props = {title: string | undefined} & PropsWithChildren & AnimatedScroll;

const HeaderChangeScrollView = ({title, children, animHeaderValue, maxHeaderHeight}: Props) => {
  const headerHeight = useHeaderHeight();
  const scrollDistance = maxHeaderHeight - headerHeight;

  const headerOpacity = animHeaderValue.interpolate<number>({
    inputRange: [0, scrollDistance],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const navigation = useNavigation();
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
          <Text numberOfLines={1} style={{fontSize: 17, fontWeight: '500', color: '#fff'}}>
            {title}
          </Text>
        </Animated.View>
      ),
      headerTransparent: true,
    });
  }, [headerOpacity, navigation, title]);

  return (
    <ScrollView
      scrollEventThrottle={16}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {y: animHeaderValue}}}], {
        useNativeDriver: false,
      })}>
      {children}
    </ScrollView>
  );
};

export default HeaderChangeScrollView;
