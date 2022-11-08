import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TrackPlayer from 'react-native-track-player';

import MainScreen from '@/screens/MainScreen';
import PlaylistScreen from '@/screens/PlaylistScreen';
import PlayerScreen from '@/screens/PlayerScreen';
import {trackPlayerServices} from './service';

import {RootStackParamList} from '@/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  useEffect(() => {
    (async () => {
      await TrackPlayer.setupPlayer().then(() => {
        console.log('plyer is setup!');
      });

      TrackPlayer.registerPlaybackService(() => trackPlayerServices);
    })();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerTintColor: '#fff'}}>
        <Stack.Screen name="Main" component={MainScreen} options={{headerShown: false}} />
        <Stack.Screen
          name="Playlist"
          component={PlaylistScreen}
          options={{
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="Player"
          component={PlayerScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
