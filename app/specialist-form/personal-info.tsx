import {
  StyleSheet,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Pressable,
} from "react-native";
import { ActivityIndicator, Avatar, Chip, Text } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import useFormState from "@/hooks/useFormState";
import PrTextInput from "@/components/CustomTextInput";
import { Colors } from "@/constants/Colors";
import { defaulStyles } from "@/constants/Styles";
import { uploadSpecialistPhoto } from "@/services/specialist.service";
import FormData from "form-data";
import { useState, useMemo } from "react";
import { AxiosError } from "axios";
import { router } from "expo-router";
import { categories } from "@/constants/Categories";
import StateSelect from "@/components/StateSelect";

const prefixes = ["Dr.", "Dra.", "Mtro.", "Mtra.", "Lic.", "none"];

const PersonalInfo = () => {
  const [imgLoading, setImgLoading] = useState(false);
  const [stateModalVisible, setStateModalVisible] = useState(false);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const prefix = useFormState((state) => state.data.prefix);
  const setPrefix = useFormState((state) => state.setPrefix);
  const category = useFormState((state) => state.data.category);
  const setCategory = useFormState((state) => state.setCategory);
  const briefDesc = useFormState((state) => state.data.briefDescription);
  const setBriefDesc = useFormState((state) => state.setBriefDesc);
  const location = useFormState((state) => state.data.location);
  const setLocation = useFormState((state) => state.setLocation);
  const photo = useFormState((state) => state.data.photoLink);
  const setPhoto = useFormState((state) => state.setPhoto);
  const setBudget = useFormState((state) => state.setBudgetRange);

  const pickImage = async () => {
    setImgLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      try {
        const photo = result.assets[0];
        const formData = new FormData();
        if (Platform.OS === "web") {
          const getImage = await fetch(photo.uri);
          const imgBlob = await getImage.blob();
          formData.append("photo", imgBlob);
        } else {
          formData.append("photo", {
            uri: photo.uri,
            type: `${photo.mimeType}`,
            name: photo.uri.split("/").pop(),
          });
        }

        formData.append("isPublic", "true");
        const response = await uploadSpecialistPhoto(formData);
        setPhoto(response.url);
      } catch (error: any) {
        const err = error as AxiosError;
        console.log("error", err.response?.data);
      }
    }
    setImgLoading(false);
  };

  const goNextStep = () => {
    setBudget([Number(min.trim()), Number(max.trim())]);
    router.push("/specialist-form/speciality");
  };

  const isFormValid = useMemo(() => {
    return (
      prefix !== "none" &&
      briefDesc.trim() !== "" &&
      location.trim() !== "" &&
      photo !== "" &&
      min.trim() !== "" &&
      max.trim() !== "" &&
      Number(min) > 0 &&
      Number(max) >= Number(min)
    );
  }, [prefix, briefDesc, location, photo, min, max]);

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Información Personal</Text>
          </View>
          <Text style={styles.headerSubTitle}>
            La informacion llenada aqui se vera reflejada en la lista de
            especialistas
          </Text>
          <View style={{ marginBottom: 10 }}>
            {photo !== "" && (
              <View style={{ alignItems: "center", marginBottom: 10 }}>
                <Avatar.Image size={100} source={{ uri: photo }} />
              </View>
            )}
            {imgLoading ? (
              <ActivityIndicator />
            ) : (
              <TouchableOpacity
                style={defaulStyles.btn}
                onPress={() => pickImage()}
              >
                <Text style={defaulStyles.btnText}>Seleccionar Fotografia</Text>
              </TouchableOpacity>
            )}
          </View>
          <View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Selecciona un Prefijo:</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={defaulStyles.optionContainer}
              >
                {prefixes.map((opt, i) => (
                  <Chip
                    key={i}
                    style={[
                      defaulStyles.option,
                      prefix === opt && defaulStyles.optionSelected,
                    ]}
                    onPress={() => setPrefix(opt)}
                  >
                    <Text style={{ fontFamily: "mn-r" }}>
                      {opt === "none" ? "Ninguno" : opt}
                    </Text>
                  </Chip>
                ))}
              </ScrollView>
            </View>
            <View style={styles.inputContainer}>
              <PrTextInput
                placeholder="Breve Descripción"
                onChangeText={(text) => setBriefDesc(text)}
                value={briefDesc}
              />
            </View>
            <View style={styles.inputContainer}>
              <Pressable
                onPress={() => setStateModalVisible(true)}
                style={styles.statePressable}
              >
                <Text
                  style={
                    location
                      ? styles.stateText
                      : styles.stateTextPlaceholder
                  }
                >
                  {location || "Selecciona un estado"}
                </Text>
              </Pressable>
              <StateSelect
                visible={stateModalVisible}
                onClose={() => setStateModalVisible(false)}
                onSelect={setLocation}
                selectedState={location}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Costo consulta (Aprox.):</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <PrTextInput
                  style={{ width: 100 }}
                  placeholder="Min."
                  onChangeText={setMin}
                  value={min}
                  keyboardType="numeric"
                />
                <PrTextInput
                  style={{ width: 100 }}
                  placeholder="Max."
                  onChangeText={setMax}
                  value={max}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Selecciona una Categoria:</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={defaulStyles.optionContainer}
              >
                {categories.map((opt, i) => {
                  if (opt.id === "none") return null;
                  return (
                    <Chip
                      key={i}
                      style={[
                        defaulStyles.option,
                        category === opt.id && defaulStyles.optionSelected,
                      ]}
                      onPress={() => setCategory(opt.id)}
                    >
                      <Text style={{ fontFamily: "mn-r" }}>{opt.name}</Text>
                    </Chip>
                  );
                })}
              </ScrollView>
            </View>
            <View style={{ marginTop: 10 }}>
              <TouchableOpacity
                style={[
                  defaulStyles.btn,
                  !isFormValid && styles.buttonDisabled,
                ]}
                onPress={() => goNextStep()}
                disabled={!isFormValid}
              >
                <Text style={defaulStyles.btnText}>Siguiente</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
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
  headerSubTitle: {
    fontFamily: "mn-r",
    fontSize: 20,
    marginVertical: 10,
  },
  infoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  infoText: {
    fontFamily: "mn-r",
    fontSize: 18,
  },
  inputContainer: {
    marginVertical: 5,
  },
  inputTitle: {
    fontFamily: "mn-r",
    fontSize: 18,
    padding: 6,
  },
  buttonDisabled: {
    backgroundColor: Colors.dark.outline,
  },
  statePressable: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.dark.outlineVariant,
    padding: 14,
    marginBottom: 16,
    marginTop: 8,
  },
  stateText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'mn-r',
  },
  stateTextPlaceholder: {
    color: Colors.dark.outline,
    fontSize: 16,
    fontFamily: 'mn-r',
  },
});

export default PersonalInfo;
