import { View } from "react-native";
import { Text } from "react-native-paper";
import React from "react";
import { Link } from "expo-router";

const Page = () => {
  return (
    <View>
      <Link href={"/(modals)/login"}>
        <Text>Login</Text>
      </Link>
      <Link href={"/(modals)/schedule"}>
        <Text>Schedule</Text>
      </Link>
      <Link href={"/specialist/123"}>
        <Text>Specilist detail page</Text>
      </Link>
      <Text>Home</Text>
    </View>
  );
};

export default Page;
