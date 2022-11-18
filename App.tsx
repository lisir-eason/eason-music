import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import FlashMessage from 'react-native-flash-message';

import MainScreen from '@/screens/MainScreen';
import PlaylistScreen from '@/screens/PlaylistScreen';
import PlayerScreen from '@/screens/PlayerScreen';
import {store} from '@/store/index';
import InitPlayerConfig from '@/components/InitPlayerConfig';

import {RootStackParamList} from '@/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <Provider store={store}>
      <InitPlayerConfig />
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
              gestureDirection: 'vertical',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage position="top" titleStyle={{color: '#fff', textAlign: 'center'}} />
    </Provider>
  );
};

export default App;
