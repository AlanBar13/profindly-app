import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useMemo, useState } from "react";
import { Text } from "react-native-paper";
import useFormState from "@/hooks/useFormState";
import MultiSelectInput from "@/components/MultiSelectInput";
import PrTextInput from "@/components/CustomTextInput";
import NumberSelector from "@/components/NumberSelector";
import { defaulStyles } from "@/constants/Styles";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";

const Speciality = () => {
  const [subSpecialityText, setSubSpecialityText] = useState("");
  const [specialityIdText, setSpecialityIdText] = useState("");
  const speciality = useFormState((state) => state.data.speciality);
  const setspeciality = useFormState((state) => state.setSpeciality);
  const subspecialities = useFormState((state) => state.data.subspecialities);
  const setSubspecialities = useFormState((state) => state.setSubspecialities);
  const specialist_ids = useFormState((state) => state.data.specialistId);
  const setSpecialistId = useFormState((state) => state.setSpecialistId);
  const description = useFormState((state) => state.data.description);
  const setDescription = useFormState((state) => state.setDescription);
  const experience = useFormState((state) => state.data.experience);
  const addExperience = useFormState((state) => state.addExperience);
  const removeExperience = useFormState((state) => state.removeExperience);

  const onAddSubspeciality = () => {
    const subArray = [...subspecialities, subSpecialityText];
    setSubspecialities(subArray);
    setSubSpecialityText("");
  };

  const onRemoveSpeciality = (index: number) => {
    const subArray = [...subspecialities];
    subArray.splice(index, 1);
    setSubspecialities(subArray);
  };

  const onAddSpecialityId = () => {
    const subArray = [...specialist_ids, specialityIdText];
    setSpecialistId(subArray);
    setSpecialityIdText("");
  };

  const onRemoveSpecialityId = (index: number) => {
    const subArray = [...specialist_ids];
    subArray.splice(index, 1);
    setSpecialistId(subArray);
  };

  const goNextStep = () => {
    router.push("/specialist-form/last");
  };

  const isFormValid = useMemo(() => {
    return (
      speciality.length > 0 &&
      speciality[0]?.trim() !== "" &&
      specialist_ids.length > 0 &&
      description.trim() !== ""
    );
  }, [speciality, specialist_ids, description]);

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Información Profesional</Text>
          </View>
          <View style={styles.inputContainer}>
            <PrTextInput
              placeholder="Especialidad"
              value={speciality[0]}
              onChangeText={(text) => setspeciality([text])}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.infoText}>Añade las subespecialidades:</Text>
            <MultiSelectInput
              placeholder="Sub-Especialidad"
              value={subSpecialityText}
              onChangeText={setSubSpecialityText}
              selectedValues={subspecialities}
              onAdd={onAddSubspeciality}
              onRemove={onRemoveSpeciality}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.infoText}>
              Añade tus cedulas profesionales: (Estas solo seran usadas para
              verificar tus estudios)
            </Text>
            <MultiSelectInput
              placeholder="090090"
              keyboardType="numeric"
              value={specialityIdText}
              onChangeText={setSpecialityIdText}
              selectedValues={specialist_ids}
              onAdd={onAddSpecialityId}
              onRemove={onRemoveSpecialityId}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.infoText}>Años de experiencia</Text>
            <NumberSelector
              value={experience}
              add={addExperience}
              remove={removeExperience}
              min={0}
              max={100}
              textStyle={styles.numberText}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.infoText}>Descripción Profesional:</Text>
            <PrTextInput
              placeholder=""
              onChangeText={setDescription}
              value={description}
              multiline
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity
              style={[defaulStyles.btn, !isFormValid && styles.buttonDisabled]}
              onPress={() => goNextStep()}
              disabled={!isFormValid}
            >
              <Text style={defaulStyles.btnText}>Siguiente</Text>
            </TouchableOpacity>
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
  numberText: {
    fontSize: 20,
    fontFamily: "mn-b",
    color: "#fff",
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    borderRadius: 10,
  },
  buttonDisabled: {
    backgroundColor: Colors.dark.outline,
  },
});

export default Speciality;
