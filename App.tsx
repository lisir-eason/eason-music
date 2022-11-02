import React, {FC} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainScreen from '@/screens/MainScreen';
import PlaylistScreen from '@/screens/PlaylistScreen.tsx';

import {RootStackParamList} from '@/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: FC = () => {
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
