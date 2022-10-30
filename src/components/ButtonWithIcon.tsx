import {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  title: string;
  icon: string;
};

const ButtonWithIcon: FC<Props> = ({title, icon}: Props) => {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={30} color="#000" />
      <Text>{title}</Text>
    </View>
  );
};

export default ButtonWithIcon;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
