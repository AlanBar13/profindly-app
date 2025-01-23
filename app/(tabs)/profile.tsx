import { View } from "react-native";
import {useEffect} from "react";
import { Text, Button } from "react-native-paper";
import { Link } from "expo-router";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/services/user.service";

const Profile = () => {
  const { isSignedIn, signOut, getToken } = useAuth();
  const { user } = useUser();
  
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => getUserProfile(await getToken()),
  });
  console.log(profile)

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
