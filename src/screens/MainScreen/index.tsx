import {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {MAIN_COLOR} from '@/constants/color';
import HomeScreen from './HomeScreen';
import SpotScreen from './SpotScreen';
import CircleScreen from './CircleScreen';
import MyScreen from './MyScreen';

import {MainTabParamList} from '@/types';

const screenCommonOptions = {
  tabBarActiveTintColor: MAIN_COLOR,
  tabBarInactiveTintColor: 'gray',
  headerShown: false,
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainScreen: FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="音乐"
        component={HomeScreen}
        options={({}) => ({
          tabBarIcon: ({focused, color, size}) => {
            const iconName = focused ? 'musical-notes' : 'musical-notes-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          ...screenCommonOptions,
        })}
      />
      <Tab.Screen
        name="现场"
        component={SpotScreen}
        options={({}) => ({
          tabBarIcon: ({focused, color, size}) => {
            const iconName = focused ? 'radio' : 'radio-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          ...screenCommonOptions,
        })}
      />
      <Tab.Screen
        name="咪咕圈"
        component={CircleScreen}
        options={({}) => ({
          tabBarIcon: ({focused, color, size}) => {
            const iconName = focused ? 'cloud' : 'cloud-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          ...screenCommonOptions,
        })}
      />
      <Tab.Screen
        name="我的"
        component={MyScreen}
        options={({}) => ({
          tabBarIcon: ({focused, color, size}) => {
            const iconName = focused ? 'person' : 'person-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          ...screenCommonOptions,
        })}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
