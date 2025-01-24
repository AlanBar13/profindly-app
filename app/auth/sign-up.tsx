import { useState } from "react";
import { router } from "expo-router";
import { View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button, HelperText, Text, Chip } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import { useAlert } from "@/hooks/useAlert";
import { AxiosError } from "axios";
import { createUser } from "@/services/user.service";
import { CreateUserData } from "@/models/User";

const SignUp = () => {
  const { user } = useUser();
  const { showAlert } = useAlert();
  const [name, setName] = useState(user?.firstName || "");
  const [lastname, setLastname] = useState(user?.lastName || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [gender, setGender] = useState("");

  const signUp = async () => {
    try {
      setLoading(true);
      if (user && user.primaryEmailAddress) {
        await user.update({
          firstName: name,
          lastName: lastname,
          unsafeMetadata: {
            gender,
            onboarding_completed: true
          },
        });
        await user.reload();
        const userData: CreateUserData = {
          name,
          lastname,
          email: user.primaryEmailAddress.emailAddress,
          gender,
          login_type: "social",
          auth_id: user.id,
        }
        await createUser(userData);
  
        setName("");
        setLastname("");
        setGender("");
        setError("");
        // Go to home route
        router.replace("/");
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 403) {
        showAlert(`El usuario ya existe`);
      } else {
        showAlert(`Error al completar usuario`);
      }
    } finally {
      setLoading(false);
    }
  };

  const selectGender = (value: string) => {
    setGender(value);
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text variant="headlineMedium">Completa tu cuenta</Text>
        <Text>
          Complreta tu cuenta para poder acceder a los miles de especialistas
          que tenemos disponibles
        </Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <TextInput
          label="Nombre(s)"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
        <TextInput
          label="Apellido(s)"
          value={lastname}
          onChangeText={(text) => setLastname(text)}
          style={styles.input}
        />
        <Text variant="headlineSmall">Genero</Text>
        <Text>Selecciona tu genero</Text>
        <View style={styles.optionContainer}>
          <Chip
            style={[styles.option, gender === "male" && styles.optionSelected]}
            onPress={() => selectGender("male")}
          >
            Hombre
          </Chip>
          <Chip
            style={[
              styles.option,
              gender === "female" && styles.optionSelected,
            ]}
            onPress={() => selectGender("female")}
          >
            Mujer
          </Chip>
          <Chip
            style={[styles.option, gender === "other" && styles.optionSelected]}
            onPress={() => selectGender("other")}
          >
            Otro
          </Chip>
        </View>
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
  optionContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  option: {
    marginRight: 5,
  },
  optionSelected: {
    backgroundColor: Colors.dark.inversePrimary,
  },
});

export default SignUp;
