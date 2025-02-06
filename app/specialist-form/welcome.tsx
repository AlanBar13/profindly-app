import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { defaulStyles } from "@/constants/Styles";
import useFormState from "@/hooks/useFormState";

const Welcome = () => {
  const setStep = useFormState((state) => state.setStep);

  const goToNextStep = () => {
    setStep(1);
    router.push("/specialist-form/personal-info");
  };


  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>¡Bienvenido a Profindly!</Text>
        <Text style={styles.text}>
          Nos entusiasma que formes parte de nuestra comunidad de especialistas
          en salud. Para garantizar una experiencia confiable y personalizada,
          solicitaremos información clave sobre tu perfil, incluyendo:
        </Text>
        <View style={styles.list}>
          <View
            style={[
              styles.listItem,
              { flexDirection: "row", alignItems: "flex-start" },
            ]}
          >
            <View style={styles.bullet}>
              <Text style={styles.bulletText}>•</Text>
            </View>
            <View style={styles.listItemContent}>
              <Text style={styles.listItemTitle}>
                Datos personales y profesionales:
              </Text>
              <Text style={styles.listItemText}>
                Nombre, prefijo, foto y una breve descripción de tu experiencia.
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.listItem,
              { flexDirection: "row", alignItems: "flex-start" },
            ]}
          >
            <View style={styles.bullet}>
              <Text style={styles.bulletText}>•</Text>
            </View>
            <View style={styles.listItemContent}>
              <Text style={styles.listItemTitle}>
                Especialidad y servicios:
              </Text>
              <Text style={styles.listItemText}>
                Áreas de especialización, subespecialidades y categorías en las
                que trabajas.
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.listItem,
              { flexDirection: "row", alignItems: "flex-start" },
            ]}
          >
            <View style={styles.bullet}>
              <Text style={styles.bulletText}>•</Text>
            </View>
            <View style={styles.listItemContent}>
              <Text style={styles.listItemTitle}>
                Ubicación y disponibilidad:
              </Text>
              <Text style={styles.listItemText}>
                Lugar de consulta, idiomas que hablas y horarios de atención.
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.text}>
          🔎 Tu perfil pasará por un proceso de verificación antes de estar
          visible para los pacientes, asegurando calidad y confianza en nuestra
          plataforma.
        </Text>
        <Text style={styles.text}>
          ¡Comienza ahora y ayuda a conectar a los pacientes con la atención que
          necesitan!
        </Text>
        <TouchableOpacity style={defaulStyles.btn} onPress={goToNextStep}>
            <Text style={defaulStyles.btnText}>Empezar</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  title: {
    fontFamily: "mn-sb",
    fontSize: 26,
    marginBottom: 12,
  },
  text: {
    fontFamily: "mn-r",
    fontSize: 18,
    marginBottom: 12,
  },
  list: {
    marginBottom: 12,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 10,
    paddingHorizontal: 12,
  },
  listItemTitle: {
    fontFamily: "mn-sb",
    fontSize: 16,
  },
  listItemText: {
    fontFamily: "mn-r",
    fontSize: 16,
  },
  bullet: {
    width: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  bulletText: {
    fontFamily: "mn-sb",
    fontSize: 16,
  },
  listItemContent: {
    marginLeft: 10,
  },
});

export default Welcome;
