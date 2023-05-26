import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { Main } from './src/components/main';

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

  return (
    fontsLoaded && (
      <Provider store={store}>
        <Main />
      </Provider>
    )
  );
}
