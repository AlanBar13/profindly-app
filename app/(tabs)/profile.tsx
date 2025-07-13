import { StyleSheet, TouchableOpacity, View, ScrollView } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import Animated, { FadeIn } from "react-native-reanimated";
import { Link } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserProfile } from "@/services/user.service";
import { SafeAreaView } from "react-native-safe-area-context";
import { defaulStyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import useProfile from "@/hooks/useProfile";
import NotSignedIn from "@/components/NotSignedIn";

const Profile = () => {
  const { isSignedIn, signOut, getToken } = useAuth();
  const { user } = useUser();
  const setUser = useProfile((state) => state.setUser);
  const unsetUser = useProfile((state) => state.unsetUser);
  const queryClient = useQueryClient();
  const {
    data: profile,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["profile"],
    enabled: isSignedIn,
    retry: false,
    queryFn: async () => {
      const token = await getToken();
      const user = await getUserProfile(token);
      setUser(user);
      return user;
    },
  });

  const handleSignOut = async () => {
    await signOut();
    queryClient.removeQueries({ queryKey: ["profile"] });
    unsetUser();
  };

  const getGenderText = (gender?: string) => {
    if (!gender) return "N/A";

    if (gender === "male") {
      return "Hombre";
    } else if (gender === "female") {
      return "Mujer";
    } else {
      return "Prefiero no decirlo";
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {isLoading && <ActivityIndicator />}
        {error && <Text>Error al cargar perfil: {error.message}</Text>}
        {isSignedIn ? (
          <Animated.View entering={FadeIn.duration(500)}>
            <Text
              style={{ fontFamily: "mn-sb", marginBottom: 12 }}
              variant="headlineLarge"
            >
              Hola, {profile?.name}
            </Text>
            <ScrollView>
              {user?.publicMetadata.specialist_form_filled !== true && (
                  <View style={{ marginBottom: 12 }}>
                    <Text
                      style={{ fontFamily: "mn-r", marginBottom: 12 }}
                      variant="bodyLarge"
                    >
                      Si quieres ser un especialista haz click en el siguiente
                      boton
                    </Text>
                    <Link href="/specialist-form/welcome" asChild>
                      <TouchableOpacity style={defaulStyles.btn}>
                        <Text style={defaulStyles.btnText}>
                          Ser Especialista
                        </Text>
                      </TouchableOpacity>
                    </Link>
                  </View>
                )}
              {(user?.publicMetadata.specialist_form_filled === true && user.publicMetadata.specialist !== true) && (
                <View style={{ marginBottom: 12 }}>
                  <Text
                    style={{ fontFamily: "mn-r", marginBottom: 12 }}
                    variant="bodyLarge"
                  >
                    Tu solicitud para ser especialista está siendo revisada. Te avisaremos por correo cuando sea aceptada.
                  </Text>
                </View>
              )}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontFamily: "mn-sb", fontSize: 18 }}>
                  Datos personales
                </Text>
                <TouchableOpacity style={styles.iconBtn}>
                  <Ionicons name="pencil" size={14} color="black" />
                </TouchableOpacity>
              </View>
              <View style={styles.divider} />
              <View style={styles.profileItem}>
                <Text style={{ fontFamily: "mn-sb" }}>Nombre(s):</Text>
                <Text style={{ fontFamily: "mn-r" }}>{profile?.name}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.profileItem}>
                <Text style={{ fontFamily: "mn-sb" }}>Apellido(s):</Text>
                <Text style={{ fontFamily: "mn-r" }}>{profile?.lastname}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.profileItem}>
                <Text style={{ fontFamily: "mn-sb" }}>Email:</Text>
                <Text style={{ fontFamily: "mn-r" }}>{profile?.email}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.profileItem}>
                <Text style={{ fontFamily: "mn-sb" }}>Genero:</Text>
                <Text style={{ fontFamily: "mn-r" }}>
                  {getGenderText(profile?.gender)}
                </Text>
              </View>
              <View style={styles.divider} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 30,
                }}
              >
                <Text style={{ fontFamily: "mn-sb", fontSize: 18 }}>
                  Preferencias
                </Text>
                <TouchableOpacity style={styles.iconBtn}>
                  <Ionicons name="pencil" size={14} color="black" />
                </TouchableOpacity>
              </View>
              <View style={styles.divider} />
              <View style={styles.profileItem}>
                <Text style={{ fontFamily: "mn-sb" }}>Lenguaje:</Text>
                <Text style={{ fontFamily: "mn-r" }}>
                  {profile?.preferred_language !== null
                    ? profile?.preferred_language
                    : "N/A"}
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.profileItem}>
                <Text style={{ fontFamily: "mn-sb" }}>Ubicacion:</Text>
                <Text style={{ fontFamily: "mn-r" }}>
                  {profile?.preferred_location !== null
                    ? profile?.preferred_location
                    : "N/A"}
                </Text>
              </View>
              <View style={styles.divider} />

              <TouchableOpacity
                style={[
                  defaulStyles.btn,
                  { backgroundColor: Colors.dark.secondary, marginTop: 30 },
                ]}
                onPress={handleSignOut}
              >
                <Text style={defaulStyles.btnText}>Cerrar Sesion</Text>
              </TouchableOpacity>
            </ScrollView>
          </Animated.View>
        ) : (
          <NotSignedIn title="Perfil" />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    height: "100%",
  },
  profileItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "grey",
    paddingHorizontal: 25,
    marginVertical: 16,
  },
  iconBtn: {
    backgroundColor: Colors.dark.primary,
    padding: 5,
    borderRadius: 100,
  },
});

export default Profile;
