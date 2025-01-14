import React from "react";
import { Tabs } from "expo-router";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.dark.primary,
        tabBarLabelStyle: {
          fontFamily: "roboto",
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
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="person-circle-outline" />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
