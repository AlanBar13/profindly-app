import { View } from "react-native";
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Text, Button } from "react-native-paper";
import { Link } from "expo-router";

const Profile = () => {
  const {session, signOut} = useAuth();
  return (
    <View>
      <Text>Profile {session && session.user.email}</Text>

      {session ? (<Button onPress={signOut} mode="contained">Cerrar Sesion</Button>): (
        <Link href="/(modals)/login" asChild>
          <Button onPress={signOut} mode="contained">Iniciar Sesion</Button>
        </Link>
      )}
    </View>
  );
};

export default Profile;
