import { View, StyleSheet } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const SpecialistForm = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.titletext}>¡Bienvenido a NexoMedix!</Text>
        <Text style={styles.text}>
          Nos entusiasma que formes parte de nuestra comunidad de especialistas
          en salud. Para garantizar una experiencia confiable y personalizada,
          solicitaremos información clave sobre tu perfil, incluyendo:
        </Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            <Text style={styles.listItemTitle}>• Datos personales y profesionales: </Text>
            <Text style={styles.listItemText}>
              Nombre, prefijo, foto y una breve descripción de tu experiencia.
            </Text>
          </Text>

          <Text style={styles.listItem}>
            <Text style={styles.listItemTitle}>• Especialidad y servicios: </Text>
            <Text style={styles.listItemText}>
              Áreas de especialización, subespecialidades y categorías en las que trabajas.
            </Text>
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.listItemTitle}>• Ubicación y disponibilidad: </Text>
            <Text style={styles.listItemText}>
              Lugar de consulta, idiomas que hablas y horarios de atención.
            </Text>
          </Text>

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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginTop: 30,
  },
  titletext: {
    fontFamily: "mn-sb",
    marginBottom: 12,
    fontSize: 26,
  },
  text: {
    fontFamily: "mn-r",
    marginBottom: 12,
    fontSize: 18,
  },
  list: {
    marginBottom: 12,
    fontSize: 18,
    paddingHorizontal: 12,
  },
  listItem: {
    flexDirection: "row",
  },
  listItemTitle: {
    fontFamily: "mn-sb",
    fontSize: 16,
  },

  listItemText: {
    fontFamily: "mn-r",
    fontSize: 16,
  },
});


export default SpecialistForm;
