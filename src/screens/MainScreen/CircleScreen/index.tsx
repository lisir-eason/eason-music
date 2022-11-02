import {View, Text} from 'react-native';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {AllNavigationProps} from '@/types';

type Props = {} & NativeStackScreenProps<AllNavigationProps>;

const CircleScreen = ({}: Props) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>MiGuScreen</Text>
    </View>
  );
};

export default CircleScreen;
