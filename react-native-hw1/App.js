import { StatusBar } from 'expo-status-bar';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

import { NavigationContainer } from '@react-navigation/native';

import { useEffect } from 'react';
import { useFonts } from 'expo-font';

import { useRoute } from './src/route';

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
