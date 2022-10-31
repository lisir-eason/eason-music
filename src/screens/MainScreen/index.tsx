import {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import SpotScreen from './SpotScreen';
import PlayerScreen from './PlayerScreen';
import CircleScreen from './CircleScreen';
import MyScreen from './MyScreen';

import {MainTabParamList} from '@/types';

const screenCommonOptions = {
  tabBarActiveTintColor: '#FC69A3',
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
        name="播放"
        component={PlayerScreen}
        options={({}) => ({
          tabBarIcon: ({focused, color, size}) => {
            const iconName = focused ? 'play-circle' : 'play-circle-outline';
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
