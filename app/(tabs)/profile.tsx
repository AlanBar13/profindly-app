import { View } from "react-native";
import { Text, Button, ActivityIndicator } from "react-native-paper";
import { Link } from "expo-router";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserProfile } from "@/services/user.service";

const Profile = () => {
  const { isSignedIn, signOut, getToken } = useAuth();
  const { user } = useUser();
  const queryClient = useQueryClient();

  const {data: profile, isLoading, error} = useQuery({
    queryKey: ["profile"],
    enabled: isSignedIn,
    retry: false,
    queryFn: async () => getUserProfile(await getToken()),
  });


  const handleSignOut = async () => {
    await signOut();
    queryClient.removeQueries({ queryKey: ['profile'] });
  };

  return (
    <View>
      <Text>Profile {user && user.firstName}</Text>
      <Text>{JSON.stringify(profile)}</Text>
      {isSignedIn ? (
        <Button onPress={handleSignOut} mode="contained">
          Cerrar Sesion
        </Button>
      ) : (
        <Link href="/(modals)/login" asChild>
          <Button mode="contained">Iniciar Sesion</Button>
        </Link>
      )}
      {isLoading && <ActivityIndicator />}
      {error && <Text>Error: {error.message}</Text>}
    </View>
  );
};

export default Profile;
