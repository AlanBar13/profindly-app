import { useState } from "react";
import { router } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import { Colors } from "@/constants/Colors";

const SignUp = () => {
  const { loading, signUpWithEmail } = useAuth();
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const signUp = async () => {
    if (password !== passwordConfirmation) {
      setError("Las contraseñas no concuerdan...");
      return;
    }

    await signUpWithEmail(email, password, name, lastname);
    setName("");
    setLastname("");
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
    setError("");
    // Go to home route
    router.replace("/");
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          label="Nombre"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
        <TextInput
          label="Apellido"
          value={lastname}
          onChangeText={(text) => setLastname(text)}
          style={styles.input}
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
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
          style={styles.input}
        />
        <TextInput
          label="Confirmar Contraseña"
          value={passwordConfirmation}
          secureTextEntry={showPassword}
          onChangeText={(text) => setPasswordConfirmation(text)}
          autoCapitalize="none"
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          style={styles.input}
        />
      </View>

      <HelperText type="error" visible={!!error}>
        {error}
      </HelperText>

      <View>
        <Button loading={loading} onPress={() => signUp()} mode="contained">
          Crear cuenta
        </Button>
      </View>
    </ScrollView>
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
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  chip: {
    margin: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default SignUp;
