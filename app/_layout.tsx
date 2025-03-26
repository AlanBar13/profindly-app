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
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import {
  AppStateStatus,
  Platform,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { tokenCache } from "@/lib/cache";
import AlertProvider from "@/hooks/useAlert";
import { Ionicons } from "@expo/vector-icons";
import ModalHeaderText from "@/components/ModalHeaderText";
import {
  focusManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useAppState } from "@/hooks/useAppState";
import { useOnlineManager } from "@/hooks/useOnlineManager";
import NotificationProvider from "@/hooks/useNotifications";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  })
})

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

// React Query Client
const queryClient = new QueryClient();
function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

export default function RootLayout() {
  useOnlineManager();

  useAppState(onAppStateChange);
  const colorScheme = useColorScheme();
  const paperTheme =
    colorScheme === "dark" ? CombinedDarkTheme : CombinedLightTheme;
  const [loaded] = useFonts({
    "mn-r": require("../assets/fonts/Montserrat-Regular.ttf"),
    "mn-sb": require("../assets/fonts/Montserrat-SemiBold.ttf"),
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
    <PaperProvider theme={CombinedDarkTheme}>
      <NotificationProvider>
        <ThemeProvider value={CombinedDarkTheme}>
          <AlertProvider>
            <ClerkProvider
              tokenCache={tokenCache}
              publishableKey={publishableKey}
            >
              <ClerkLoaded>
                <QueryClientProvider client={queryClient}>
                  <RootLayoutNav />
                  <StatusBar style="auto" />
                </QueryClientProvider>
              </ClerkLoaded>
            </ClerkProvider>
          </AlertProvider>
        </ThemeProvider>
      </NotificationProvider>
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
          headerTitle: "",
          headerTransparent: true,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="auth/sign-up"
        options={{
          title: "",
          headerTransparent: true,
          headerTitleStyle: {
            fontFamily: "mn-r",
          },
          headerLeft: () => (
            <TouchableOpacity onPressIn={() => router.back()}>
              <Ionicons name="close-outline" size={28} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="schedule/[id]"
        options={{
          title: "",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="notification/[id]"
        options={{
          title: "",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="specialist/[id]"
        options={{ headerTitle: "", headerTransparent: true }}
      />
      <Stack.Screen
        name="(modals)/filter"
        options={{
          animation: "fade",
          presentation: "transparentModal",
          headerTransparent: true,
          headerTitle: () => <ModalHeaderText />,
          headerLeft: () => (
            <TouchableOpacity
              onPressIn={() => router.back()}
              style={{
                backgroundColor: "#fff",
                borderBlockColor: "grey",
                borderRadius: 20,
                borderWidth: 1,
                padding: 4,
              }}
            >
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="specialist-form" options={{ headerShown: false }} />
    </Stack>
  );
}
