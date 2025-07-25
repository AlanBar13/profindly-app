import { useState } from "react";
import { router } from "expo-router";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { TextInput, Button, HelperText, Text, Chip } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import { useAlert } from "@/hooks/useAlert";
import { AxiosError } from "axios";
import { createUser } from "@/services/user.service";
import { CreateUserData } from "@/models/User";
import { defaulStyles } from "@/constants/Styles";
import { useNotification } from "@/hooks/useNotifications";

const SignUp = () => {
  const { user } = useUser();
  const { showAlert } = useAlert();
  const { expoPushToken } = useNotification();
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
            onboarding_completed: true,
          },
        });
        await user.reload();
        const userData: CreateUserData = {
          name,
          lastname,
          email: user.primaryEmailAddress.emailAddress,
          gender,
          loginType: "social",
          authId: user.id,
        };

        if (expoPushToken) {
          userData["notificationToken"] = expoPushToken;
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
      console.log(err.response?.data);
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
        <Text style={{ fontFamily: "mn-sb" }} variant="headlineMedium">
          Completa tu cuenta
        </Text>
        <Text style={{ fontFamily: "mn-r", fontSize: 16 }}>
          Completa tu cuenta para poder contactar a los miles de especialistas
          que tenemos disponibles
        </Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <TextInput
          label="Nombre(s)"
          outlineStyle={{ borderRadius: 10 }}
          contentStyle={{ fontFamily: "mn-r" }}
          mode="outlined"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
        <TextInput
          label="Apellido(s)"
          outlineStyle={{ borderRadius: 10 }}
          contentStyle={{ fontFamily: "mn-r" }}
          mode="outlined"
          value={lastname}
          onChangeText={(text) => setLastname(text)}
          style={styles.input}
        />
        <Text style={{ fontFamily: "mn-sb" }} variant="headlineSmall">
          Genero
        </Text>
        <Text style={{ fontFamily: "mn-r", fontSize: 16 }}>
          Selecciona tu genero
        </Text>
        <View style={styles.optionContainer}>
          <Chip
            style={[styles.option, gender === "male" && styles.optionSelected]}
            onPress={() => selectGender("male")}
          >
            <Text style={{ fontFamily: "mn-r" }}>Hombre</Text>
          </Chip>
          <Chip
            style={[
              styles.option,
              gender === "female" && styles.optionSelected,
            ]}
            onPress={() => selectGender("female")}
          >
            <Text style={{ fontFamily: "mn-r" }}>Mujer</Text>
          </Chip>
          <Chip
            style={[styles.option, gender === "other" && styles.optionSelected]}
            onPress={() => selectGender("other")}
          >
            <Text style={{ fontFamily: "mn-r" }}>Otro</Text>
          </Chip>
        </View>
      </View>

      <HelperText type="error" visible={!!error}>
        {error}
      </HelperText>

      <View>
        <TouchableOpacity style={defaulStyles.btn} onPress={() => signUp()}>
          <Text style={defaulStyles.btnText}>Crear cuenta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
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
