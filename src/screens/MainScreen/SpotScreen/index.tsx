import {View, Text} from 'react-native';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {AllNavigationProps} from '@/types';

type Props = {} & NativeStackScreenProps<AllNavigationProps>;

const DetailsScreen = ({}: Props) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>SpotScreen</Text>
    </View>
  );
};

export default DetailsScreen;
