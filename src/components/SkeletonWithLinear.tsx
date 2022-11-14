import {Skeleton} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import {StyleProp, ViewStyle} from 'react-native';

type Props = {
  height?: number;
  width?: number;
  circle?: boolean;
  style?: StyleProp<ViewStyle>;
};

const SkeletonWithLinear = ({height, ...props}: Props) => {
  return (
    <Skeleton
      LinearGradientComponent={LinearGradient}
      animation="wave"
      height={height}
      {...props}
    />
  );
};

export default SkeletonWithLinear;
