import { useEffect } from "react";
import { Redirect, Tabs } from "expo-router";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUser, useAuth } from "@clerk/clerk-expo";
import useProfile from "@/hooks/useProfile";
import {
  getUserProfile,
  updateUserNotificationToken,
} from "@/services/user.service";
import { useNotification } from "@/hooks/useNotifications";

const Layout = () => {
  const { user } = useUser();
  const { isSignedIn, getToken } = useAuth();
  const { expoPushToken } = useNotification();
  const setUser = useProfile((state) => state.setUser);

  const getProfile = async () => {
    const token = await getToken();
    const user = await getUserProfile(token);
    if (expoPushToken !== null && user.notificationToken !== expoPushToken) {
      console.log("No token");
      await updateUserNotificationToken(user.authId, expoPushToken, token);
    }
    setUser(user);
  };

  useEffect(() => {
    if (isSignedIn && expoPushToken !== null) {
      getProfile();
    }
  }, [isSignedIn, expoPushToken]);

  if (isSignedIn && !user?.unsafeMetadata.onboarding_completed) {
    return <Redirect href="/auth/sign-up" />;
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.dark.primary,
        tabBarLabelStyle: {
          fontFamily: "mn-r",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Explorar",
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="search" />
          ),
        }}
      />
      <Tabs.Screen
        name="appointment"
        options={{
          tabBarLabel: "Citas",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="calendar-outline" />
          ),
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          tabBarLabel: "Notificaciones",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              color={color}
              size={size}
              name="chatbox-ellipses-outline"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="service"
        options={{
          href:
            user?.publicMetadata.specialist === true ? "/(tabs)/service" : null, // hide tab if user is not specialist
          tabBarLabel: "Servicio",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="file-tray-full-outline" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Perfil",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="person-circle-outline" />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
