import {View, Text, TouchableHighlight} from 'react-native';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {AllNavigationProps} from '@/types';
import TouchID from 'react-native-touch-id';

type Props = {} & NativeStackScreenProps<AllNavigationProps>;

const DetailsScreen = ({}: Props) => {
  const _pressHandler = () => {
    TouchID.authenticate('to demo this react-native component')
      .then(() => {
        console.log('Authenticated Successfully');
      })
      .catch(() => {
        console.log('Authentication Failed');
      });
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>SpotScreen</Text>
      {/* test touch id success! */}
      <TouchableHighlight onPress={_pressHandler}>
        <Text>Authenticate with Touch ID</Text>
      </TouchableHighlight>
    </View>
  );
};

export default DetailsScreen;
