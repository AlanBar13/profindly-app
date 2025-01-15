import { View } from "react-native";
import React from "react";
import { Text, Button } from "react-native-paper";
import { Link } from "expo-router";
import { useUser, useAuth } from "@clerk/clerk-expo";

const Profile = () => {
  const { isSignedIn, signOut } = useAuth();
  const { user } = useUser();
  return (
    <View>
      <Text>Profile {user && user.firstName}</Text>

      {isSignedIn ? (
        <Button onPress={() => signOut()} mode="contained">
          Cerrar Sesion
        </Button>
      ) : (
        <Link href="/(modals)/login" asChild>
          <Button mode="contained">Iniciar Sesion</Button>
        </Link>
      )}
    </View>
  );
};

export default Profile;
