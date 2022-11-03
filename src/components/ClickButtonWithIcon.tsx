import {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  size: number;
  icon: string;
  color: string;
};

const ClickButtonWithIcon: FC<Props> = ({size, icon, color}: Props) => {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={size} color={color} />
    </View>
  );
};

export default ClickButtonWithIcon;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginLeft: 3,
    marginRight: 3,
  },
});
