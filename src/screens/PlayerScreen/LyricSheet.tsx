import {type Dispatch, SetStateAction, useCallback} from 'react';
import {BlurView} from '@react-native-community/blur';
import {BottomSheet, Image} from '@rneui/themed';
import {Pressable, Text, View} from 'react-native';
import {Lyric, type LrcLine} from 'react-native-lyric';
import {Track} from 'react-native-track-player';

import {ScreenHeight} from '@/constants/dimension';
import {MAIN_COLOR} from '@/constants/color';
import {H3} from '@/components/StyledComponent';

type Props = {
  isVisible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  lyric: string;
  position: number;
  currentTrack: null | Track;
};

type LyricProps = {
  lrcLine: LrcLine;
  index: number;
  active: boolean;
};

const LyricSheet = ({isVisible, setVisible, lyric, position, currentTrack}: Props) => {
  const lineRenderer = useCallback(
    ({lrcLine: {content}, active}: LyricProps) => (
      <View style={{height: '100%', alignItems: 'center'}}>
        <Text
          style={{
            textAlign: 'center',
            color: active ? MAIN_COLOR : 'gray',
            fontSize: active ? 22 : 18,
          }}>
          {content}
        </Text>
      </View>
    ),
    [],
  );

  return (
    <BottomSheet isVisible={isVisible} onBackdropPress={() => setVisible(false)}>
      <BlurView
        blurType="dark"
        blurAmount={10}
        reducedTransparencyFallbackColor="black"
        style={{width: '100%', height: ScreenHeight - 100}}>
        <View
          style={{
            height: 100,
            paddingLeft: 20,
            paddingRight: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{width: 50, height: 50, borderRadius: 5}}
            source={{uri: currentTrack?.artwork as string | undefined}}
          />
          <View style={{flex: 1, marginLeft: 20}}>
            <H3 numberOfLines={1}>{currentTrack?.title}</H3>
            <Text style={{color: 'white'}} numberOfLines={1}>
              {currentTrack?.artist}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            paddingLeft: 20,
            paddingRight: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Lyric
            style={{height: 500, width: '100%'}}
            lrc={lyric}
            currentTime={position * 1000}
            lineHeight={40}
            activeLineHeight={50}
            lineRenderer={lineRenderer}
            autoScrollAfterUserScroll={3000}
            autoScroll={true}
            height={100}
          />
        </View>
        <Pressable
          style={{height: 100, justifyContent: 'center', alignItems: 'center'}}
          onPress={() => {
            setVisible(false);
          }}>
          <Text style={{color: 'white', fontSize: 16}}>关闭</Text>
        </Pressable>
      </BlurView>
    </BottomSheet>
  );
};

export default LyricSheet;
