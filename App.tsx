import * as SplashScreen from "expo-splash-screen";

import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { useCallback } from 'react';
import { NavigationHandler } from './src/routes';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./src/store/store";


export default function App() {
  const [fontsLoaded] = useFonts({
    "grotesk": require("./src/assets/fonts/grotesk.ttf"),
    "groteskBold": require("./src/assets/fonts/groteskBold.ttf"),
    'dm-sans': require("./src/assets/fonts/DMSans.ttf"),
    'dm-sans-b': require("./src/assets/fonts/DMSans-Bold.ttf"),
    'dm-sans-xb': require("./src/assets/fonts/DMSans-ExtraBold.ttf"),
    'dm-sans-sb': require("./src/assets/fonts/DMSans-SemiBold.ttf"),
    'dm-sans-black': require("./src/assets/fonts/DMSans-Black.ttf")
  });


  const queryClient = new QueryClient()

  SplashScreen.preventAutoHideAsync()
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationHandler onReady={onLayoutRootView} />
      </QueryClientProvider>
    </Provider>
  );
}

