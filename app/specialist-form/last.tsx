import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Colors } from "@/constants/Colors";
import {
  Avatar,
  Text,
  Portal,
  Modal,
  ActivityIndicator,
} from "react-native-paper";
import useFormState from "@/hooks/useFormState";
import useProfile from "@/hooks/useProfile";
import { defaulStyles } from "@/constants/Styles";
import { createSpecialist } from "@/services/specialist.service";
import { AxiosError } from "axios";
import { router } from "expo-router";
import { categories } from "@/constants/Categories";

const Last = () => {
  const { getToken } = useAuth();
  const user = useProfile((state) => state.user);
  const data = useFormState((state) => state.data);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmitPage = async () => {
    try {
      console.log("submitting");
      setLoading(true);
      const token = await getToken();

      await createSpecialist(data, token);
      setVisible(true);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const gotoProfile = () => {
    setVisible(false);
    router.replace("/(tabs)/profile")
  }

  return (
    <ScrollView>
      <Portal>
        <Modal visible={visible} onDismiss={() => setVisible(false)}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>¡Solicitud Enviada!</Text>
            <Text style={styles.modalText}>
              Tu aplicación para ser especialista será revisada por nuestro
              equipo. Te enviaremos un correo electrónico cuando tu perfil haya
              sido verificado para que puedas comenzar a ofrecer tus servicios.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={gotoProfile}
            >
              <Text style={styles.modalButtonText}>Entendido</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Portal>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Revisar Información</Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.subTitle}>Información Personal</Text>
            <View style={{ alignItems: "center", marginBottom: 10 }}>
              <Avatar.Image size={100} source={{ uri: data.photo_link }} />
            </View>
            <View style={styles.row}>
              <Text style={styles.infoText}>Nombre a mostrar:</Text>
              <Text style={styles.infoText}>
                {data.prefix} {user.name} {user.lastname}
              </Text>
            </View>
            <View style={styles.noRow}>
              <Text style={styles.infoText}>Breve Descripción:</Text>
              <Text style={styles.infoText}>{data.brief_description}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.infoText}>Ubicación:</Text>
              <Text style={styles.infoText}>{data.location}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.infoText}>Costo Cnsulta:</Text>
              <Text style={styles.infoText}>
                {data.budget_range[0]} - {data.budget_range[1]}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.infoText}>Categoria:</Text>
              <Text style={styles.infoText}>
                {categories.find(cat => cat.id === data.category)?.name || data.category}
              </Text>
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.subTitle}>Información Profesional</Text>
            <View style={styles.row}>
              <Text style={styles.infoText}>Especialidad:</Text>
              <Text style={styles.infoText}>{data.speciality}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.infoText}>Sub - Especialidades:</Text>
              <Text style={styles.infoText}>
                {data.subspecialities.join(", ")}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.infoText}>Cedula Profesional:</Text>
              <Text style={styles.infoText}>
                {data.specialist_id.join(", ")}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.infoText}>Años de experiancia:</Text>
              <Text style={styles.infoText}>{data.experience}</Text>
            </View>
            <View style={styles.noRow}>
              <Text style={styles.infoText}>Descripción Profesional:</Text>
              <Text style={styles.infoText}>{data.description}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={[defaulStyles.btn, { marginTop: 10 }]}
            onPress={onSubmitPage}
          >
            <Text style={defaulStyles.btnText}>
              {loading ? "Cargando..." : "Terminar"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    marginTop: 50,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  headerTitle: {
    fontFamily: "mn-sb",
    fontSize: 24,
  },
  subTitle: {
    fontFamily: "mn-r",
    fontSize: 20,
    marginVertical: 10,
  },
  infoText: {
    fontFamily: "mn-r",
    fontSize: 14,
  },
  sectionContainer: {
    marginVertical: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    gap: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.primary,
  },
  noRow: {
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.primary,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    color: "black",
    fontFamily: "mn-sb",
    marginBottom: 15,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    color: "black",
    fontFamily: "mn-r",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    width: "50%",
  },
  modalButtonText: {
    color: "white",
    fontFamily: "mn-r",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Last;
