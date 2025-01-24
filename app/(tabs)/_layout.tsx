import React from "react";
import { Redirect, Tabs } from "expo-router";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUser, useAuth } from "@clerk/clerk-expo";

const Layout = () => {
  const { user } = useUser();
  const { isSignedIn } = useAuth();

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
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="calendar-outline" />
          ),
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          tabBarLabel: "Mensajes",
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
