import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";
import merge from "deepmerge";
import { Colors } from "@/constants/Colors";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { PropsWithChildren, useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "react-native";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { tokenCache } from "@/lib/cache";
import AlertProvider from "@/hooks/useAlert";
import ApiProvider from "@/hooks/useApi";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Overwrite it on the current theme
const customDarkTheme = { ...MD3DarkTheme, colors: Colors.dark };
const customLightTheme = { ...MD3LightTheme, colors: Colors.light };

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedLightTheme = merge(LightTheme, customLightTheme);
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const paperTheme =
    colorScheme === "dark" ? CombinedDarkTheme : CombinedLightTheme;
  const [loaded] = useFonts({
    "mn-r": require("../assets/fonts/Montserrat-Regular.ttf"),
    "mn-b": require("../assets/fonts/Montserrat-Bold.ttf"),
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
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={paperTheme}>
        <AlertProvider>
          <ClerkProvider
            tokenCache={tokenCache}
            publishableKey={publishableKey}
          >
            <ClerkLoaded>
              <ApiProvider>
                <RootLayoutNav />
                <StatusBar style="auto" />
              </ApiProvider>
            </ClerkLoaded>
          </ClerkProvider>
        </AlertProvider>
      </ThemeProvider>
    </PaperProvider>
  );
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/login"
        options={{
          title: "Iniciar sesion",
          headerTitleStyle: {
            fontFamily: "mn-r",
          },
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="auth/sign-up"
        options={{
          title: "",
          headerTitleStyle: {
            fontFamily: "mn-r",
          },
        }}
      />
      <Stack.Screen name="specialist/[id]" options={{ headerTitle: "" }} />
      <Stack.Screen
        name="(modals)/schedule"
        options={{
          animation: "fade",
          presentation: "transparentModal",
        }}
      />
    </Stack>
  );
}
