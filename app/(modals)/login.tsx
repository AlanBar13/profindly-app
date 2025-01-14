import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Link, router } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { Colors } from "@/constants/Colors";

const Page = () => {
  const { loading, signInWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const signIn = async () => {
    await signInWithEmail(email, password);
    setEmail("");
    setPassword("");

    // Go to home
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          label="Contraseña"
          value={password}
          secureTextEntry={showPassword}
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button mode="contained" onPress={() => signIn()} loading={loading}>
          Iniciar sesión
        </Button>
      </View>
      <View style={styles.verticallySpaced}>
        <Link href="/(modals)/sign-up" asChild>
          <Button mode="outlined">Registrarse</Button>
        </Link>
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


export default Page;
