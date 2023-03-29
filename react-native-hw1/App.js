import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  ImageBackground,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from 'react-native';
import RegistrationScreen from './src/Screens/RegistrationScreen';
import LoginScreen from './src/Screens/LoginScreen';
import * as SplashScreen from 'expo-splash-screen';
import { useState, useEffect } from 'react';
import * as Font from 'expo-font';

const backgroundImage = require('./assets/images/bg_new.png');

export default function App() {
  const [visibleScreen, setVisibleScreen] = useState('SignIn');
  const [isReady, setIsReady] = useState(false);

  const toggleVisibleScreen = (screenName) => {
    setVisibleScreen(screenName);
  };

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'Inter-VariableFont': require('./assets/fonts/Inter-VariableFont.ttf'),
      });
      setIsReady(true);
    }
    loadFonts();
  }, []);

  if (!isReady) {
    return null;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <ImageBackground source={backgroundImage} style={styles.image}>
          {visibleScreen === 'SignIn' ? (
            <RegistrationScreen toggleVisibleScreen={toggleVisibleScreen} />
          ) : (
            <LoginScreen toggleVisibleScreen={toggleVisibleScreen} />
          )}
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  title: {
    color: 'red',
    fontFamily: 'Roboto-Regular',
  },
});
