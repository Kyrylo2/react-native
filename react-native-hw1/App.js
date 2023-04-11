import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

// імпортуємо компонент NavigationContainer та createNativeStackNavigator для роботи з навігацією
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// імпортуємо екрани (screens)
// import RegistrationScreen from './src/screens/RegistrationScreen';
// import LoginScreen from './src/screens/LoginScreen';

// імпортуємо компоненти для роботи зі шрифтами
import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import PostScreen from './src/screens/mainScreen/PostsScreen';
import ProfileScreen from './src/screens/mainScreen/ProfileScreen';
import CreateScreen from './src/screens/mainScreen/CreatePostsScreen';

import { useRoute } from './src/route';

// встановлюємо навігацію
const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

export default function App() {
  // const [isReady, setIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Inter-VariableFont': require('./assets/fonts/Inter-VariableFont.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  const route = useRoute(true);

  return (
    fontsLoaded && (
      <NavigationContainer>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <>
            {route}
            <StatusBar style="auto" />
          </>
        </TouchableWithoutFeedback>
      </NavigationContainer>
    )
  );
}
