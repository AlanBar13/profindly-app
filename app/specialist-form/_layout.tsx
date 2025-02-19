import React from "react";
import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen
        name="personal-info"
        options={{
          headerTitle: "",
          headerTransparent: true,
          animation: "slide_from_right",
          headerLeft: () => (
            <TouchableOpacity onPressIn={() => router.back()}>
              <Ionicons name="arrow-back" size={26} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="speciality"
        options={{
          headerTitle: "",
          headerTransparent: true,
          animation: "slide_from_right",
          headerLeft: () => (
            <TouchableOpacity onPressIn={() => router.back()}>
              <Ionicons name="arrow-back" size={26} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="last"
        options={{
          headerTitle: "",
          headerTransparent: true,
          animation: "slide_from_right",
          headerLeft: () => (
            <TouchableOpacity onPressIn={() => router.back()}>
              <Ionicons name="arrow-back" size={26} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;
