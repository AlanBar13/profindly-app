import { View, Text } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";

const Page = () => {
  return (
    <View>
      <Link href={"/(modals)/login"} style={{ color: Colors.dark.primary }}>
        Login
      </Link>
      <Link href={"/(modals)/schedule"} style={{ color: Colors.dark.primary }}>
        Schedule
      </Link>
      <Link href={"/specialist/123"} style={{ color: Colors.dark.primary }}>
        Specilist details page
      </Link>
      <Text style={{ color: Colors.dark.primary }}>Home</Text>
    </View>
  );
};

export default Page;
