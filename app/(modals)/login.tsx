import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { useWarmUpBrowser } from "@/hooks/useWarmupBrowser";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { Ionicons } from "@expo/vector-icons";

enum Strategy {
  Google = "oauth_google",
  Apple = "oauth_apple",
}

const Login = () => {
  useWarmUpBrowser();
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });

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
      <View style={styles.verticallySpaced}>
        <Button
          icon={(props) => <Ionicons name="logo-google" {...props} />}
          mode="contained"
          onPress={() => onSelectAuth(Strategy.Google)}
        >
          Continuar con Google
        </Button>
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          icon={(props) => <Ionicons name="logo-apple" {...props} />}
          mode="contained"
          onPress={() => onSelectAuth(Strategy.Apple)}
        >
          Continuar con Apple
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    height: "100%",
    backgroundColor: Colors.dark.background,
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
