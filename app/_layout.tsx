import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    "roboto-i": require("../assets/fonts/Roboto-Italic.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(modals)/login"
          options={{
            title: "Iniciar sesion o Crear cuenta",
            headerTitleStyle: {
              fontFamily: "roboto",
            },
            presentation: "modal",
          }}
        />
        <Stack.Screen name="specialist/[id]" options={{ headerTitle: "" }} />
        <Stack.Screen name="(modals)/schedule" options={{ 
          animation: "fade",
          presentation: "transparentModal"
         }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
