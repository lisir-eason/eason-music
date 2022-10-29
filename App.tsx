import React, {FC} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '@/screens/HomeScreen';
import SpotScreen from '@/screens/SpotScreen';
import PlayerScreen from '@/screens/PlayerScreen';
import CircleScreen from '@/screens/CircleScreen';
import MyScreen from '@/screens/MyScreen';

export type RootStackParamList = {
  音乐: undefined;
  现场: undefined;
  播放: undefined;
  咪咕圈: undefined;
  我的: undefined;
};

const screenCommonOptions = {
  tabBarActiveTintColor: 'tomato',
  tabBarInactiveTintColor: 'gray',
  headerShown: false,
};

const Tab = createBottomTabNavigator<RootStackParamList>();

const App: FC = () => {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
};

export default App;
