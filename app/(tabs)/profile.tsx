import { View } from "react-native";
import {useEffect} from "react";
import { Text, Button } from "react-native-paper";
import { Link } from "expo-router";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { useApi } from "@/hooks/useApi";

const Profile = () => {
  const { isSignedIn, signOut, getToken } = useAuth();
  const { user } = useUser();
  const api = useApi()
  
  useEffect(() => {
    const getProfile = async () => {
      const token = await getToken();
      console.log(token)
      const res = await api.user.getProfile(token)
      console.log(res)
    }

    getProfile()
  }, [])

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
