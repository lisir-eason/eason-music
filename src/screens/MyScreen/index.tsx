import {View, Text} from 'react-native';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'App';

type Props = NativeStackScreenProps<RootStackParamList, '我的'>;

const MyScreen = ({}: Props) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>MyScreen</Text>
    </View>
  );
};

export default MyScreen;
