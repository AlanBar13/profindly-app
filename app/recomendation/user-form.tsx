import React, { useState, useLayoutEffect } from "react";
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, Pressable, StyleSheet } from "react-native";
import PrTextInput from "@/components/CustomTextInput";
import NumberSelector from "@/components/NumberSelector";
import StateSelect from "@/components/StateSelect";
import { router, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useRecommendationFormStore } from "@/hooks/useRecommendationForm";

import Animated, { FadeIn } from "react-native-reanimated";

const RecommendationForm = () => {
  const {
    symptoms,
    setSymptoms,
    budget,
    setBudget,
    selectedState,
    setSelectedState,
    age,
    setAge,
  } = useRecommendationFormStore();
  const [stateModalVisible, setStateModalVisible] = useState(false);
  const navigation = useNavigation();

  useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: "",
        headerTransparent: true,
  
        headerBackground: () => (
          <Animated.View
            style={styles.header}
          ></Animated.View>
        ),
        headerLeft: () => (
          <TouchableOpacity
            style={styles.roundButton}
            onPressIn={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color={"#000"} />
          </TouchableOpacity>
        ),
      });
    }, []);

  const handleBudgetChange = (type: "min" | "max", value: number) => {
    setBudget({ ...budget, [type]: value });
  };

  const handleSubmit = () => {
    router.push("/recomendation/result");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.keyboardAvoiding}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Recomendación de Especialista</Text>
        <Text style={styles.label}>¿Cuáles son tus síntomas?</Text>
        <PrTextInput
          placeholder="Describe tus síntomas"
          value={symptoms}
          onChangeText={setSymptoms}
          multiline
        />

        <Text style={[styles.label, styles.sectionLabel]}>¿Cuál es tu edad?</Text>
        <PrTextInput
          placeholder="Ejemplo: 30 (solo números)"
          value={age ? String(age) : ''}
          onChangeText={text => {
            // Solo permitir números y limitar el rango de edad
            const numeric = text.replace(/[^0-9]/g, "");
            let value = numeric ? parseInt(numeric) : 0;
            if (value > 120) value = 120;
            setAge(value);
          }}
          keyboardType="numeric"
          style={styles.ageInput}
        />
        {(!age || age < 1) && (
          <Text style={styles.ageHint}>Por favor ingresa tu edad en años (ejemplo: 30)</Text>
        )}
        <Text style={[styles.label, styles.sectionLabel]}>¿Cuál es tu presupuesto para la consulta?</Text>
        <View style={styles.budgetRow}>
          <View style={styles.budgetCol}>
            <Text style={styles.budgetLabel}>Mínimo</Text>
            <NumberSelector
              value={budget.min}
              add={() => handleBudgetChange("min", Math.min(budget.min + 50, budget.max - 50))}
              remove={() => handleBudgetChange("min", Math.max(0, budget.min - 50))}
              min={0}
              max={budget.max - 50}
              textStyle={styles.budgetValue}
            />
          </View>
          <View style={styles.budgetCol}>
            <Text style={styles.budgetLabel}>Máximo</Text>
            <NumberSelector
              value={budget.max}
              add={() => handleBudgetChange("max", budget.max + 50)}
              remove={() => handleBudgetChange("max", Math.max(budget.min + 50, budget.max - 50))}
              min={budget.min + 50}
              max={10000}
              textStyle={styles.budgetValue}
            />
          </View>
        </View>
        <Text style={[styles.label, styles.sectionLabel]}>¿Dónde deseas la consulta?</Text>
        <Pressable
          onPress={() => setStateModalVisible(true)}
          style={styles.statePressable}
        >
          <Text style={selectedState ? styles.stateText : styles.stateTextPlaceholder}>
            {selectedState || 'Selecciona un estado'}
          </Text>
        </Pressable>
        <StateSelect
          visible={stateModalVisible}
          onClose={() => setStateModalVisible(false)}
          onSelect={setSelectedState}
          selectedState={selectedState}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Buscar especialista</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoiding: {
    flex: 1,
    backgroundColor: Colors.dark.surface,
    justifyContent: 'center',
    marginTop: 100,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    padding: 24,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: Colors.dark.onBackground,
    fontFamily: 'mn-b',
  },
  label: {
    marginBottom: 8,
    color: Colors.dark.onBackground,
    fontFamily: 'mn-r',
  },
  sectionLabel: {
    marginTop: 16,
  },
  budgetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  budgetCol: {
    flex: 1,
    alignItems: 'center',
  },
  budgetLabel: {
    color: Colors.dark.onBackground,
    marginBottom: 4,
    fontFamily: 'mn-r',
  },
  budgetValue: {
    fontSize: 16,
    color: Colors.dark.primary,
    fontFamily: 'mn-sb',
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
  submitButton: {
    marginTop: 32,
    backgroundColor: Colors.dark.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitButtonText: {
    color: Colors.dark.onPrimary,
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'mn-b',
  },
  resultOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.dark.surface,
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: Colors.dark.shadow,
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  resultOverlayText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.dark.onSurface,
    fontFamily: 'mn-b',
  },
  header: {
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "grey",
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    color: Colors.dark.primary,
  },
  ageInput: {
    fontSize: 16,
    color: Colors.dark.primary,
    fontFamily: 'mn-sb',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.dark.outlineVariant,
    marginBottom: 4,
  },
  ageHint: {
    color: Colors.dark.outline,
    fontSize: 13,
    marginBottom: 8,
    fontFamily: 'mn-r',
    marginLeft: 2,
  },
});

export default RecommendationForm;
