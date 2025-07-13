import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import { useWarmUpBrowser } from "@/hooks/useWarmupBrowser";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { Ionicons } from "@expo/vector-icons";
import { defaulStyles } from "@/constants/Styles";
import { useLayoutEffect } from "react";
import { useNavigation, router } from "expo-router";

enum Strategy {
  Google = "oauth_google",
  Apple = "oauth_apple",
}

const Login = () => {
  useWarmUpBrowser();
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTransparent: true,
      headerLeft: () => (
        <TouchableOpacity onPressIn={() => router.back()}>
          <Ionicons name="close" size={26} color="white" />
        </TouchableOpacity>
      )
    });
  }, []);

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Apple]: appleAuth,
      [Strategy.Google]: googleAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth({
        redirectUrl: Linking.createURL("/"),
      });
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (error) {
      console.error("OAuth Error: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced]}>
        <Text style={{ fontFamily: "mn-b", fontSize: 20, marginBottom: 12, color: "white" }}>Bienvenido a NexoMedix</Text>
        <Text style={{ fontFamily: "mn-r", fontSize: 16, marginBottom: 12, color: "white" }}>Inicia sesion o registrate con tu cuenta de Google o Apple</Text>
      </View>
      <View style={styles.verticallySpaced}>
        <TouchableOpacity
          style={[defaulStyles.btn, { flexDirection: "row" }]}
          onPress={() => onSelectAuth(Strategy.Google)}
        >
          <Ionicons
            style={{ marginRight: 10 }}
            name="logo-google"
            size={24}
            color={Colors.dark.onPrimary}
          />
          <Text style={defaulStyles.btnText}>Iniciar con Google</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.verticallySpaced}>
      <TouchableOpacity
          style={[defaulStyles.btn, { flexDirection: "row" }]}
          onPress={() => onSelectAuth(Strategy.Apple)}
        >
          <Ionicons
            style={{ marginRight: 10 }}
            name="logo-apple"
            size={24}
            color={Colors.dark.onPrimary}
          />
          <Text style={defaulStyles.btnText}>Iniciar con Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    height: "100%",
    backgroundColor: Colors.dark.background,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginTop: 50,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});

export default Login;
