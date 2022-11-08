import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TrackPlayer from 'react-native-track-player';

import MainScreen from '@/screens/MainScreen';
import PlaylistScreen from '@/screens/PlaylistScreen.tsx';
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

      // await TrackPlayer.add([track]);

      // await TrackPlayer.play();
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
