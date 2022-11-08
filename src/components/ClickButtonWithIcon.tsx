import {FC} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  size: number;
  icon: string;
  color: string;
  onPress: () => void;
};

const ClickButtonWithIcon: FC<Props> = ({size, icon, color, onPress}: Props) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
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
