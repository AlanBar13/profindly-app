import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Animated as RNAnimated, Easing } from "react-native";
import { useNavigation, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useRecommendationFormStore } from "@/hooks/useRecommendationForm";
import { getRecomendations } from "@/services/recomendation.service";
import { AISpecialist } from "@/models/Recomendation";
import RecommendationListings from "@/components/RecomendationListings";

const loadingPhrases = [
  "Analizando tus síntomas...",
  "Buscando especialistas cercanos...",
  "Consultando IA médica...",
  "Filtrando resultados para ti...",
  "Casi listo, preparando recomendaciones...",
];

const Result = () => {
  const [loading, setLoading] = useState(true);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [specialists, setSpecialists] = useState<AISpecialist[]>([]);
  const progress = useRef(new RNAnimated.Value(0)).current;
  const navigation = useNavigation();
  const { symptoms, budget, selectedState, age } = useRecommendationFormStore();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTransparent: true,

      headerBackground: () => (
        <Animated.View style={styles.header}></Animated.View>
      ),
      headerLeft: () => (
        <>
          {!loading && (
            <TouchableOpacity
              style={styles.roundButton}
              onPressIn={() => router.back()}
            >
              <Ionicons name="chevron-back" size={24} color={"#000"} />
            </TouchableOpacity>
          )}
        </>
      ),
    });
  }, [loading]);

  useEffect(() => {
    if (!loading) return;
    RNAnimated.timing(progress, {
      toValue: 1,
      duration: 6000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
    const phraseInterval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % loadingPhrases.length);
    }, 1800);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 6000);
    return () => {
      clearInterval(phraseInterval);
      clearTimeout(timeout);
      progress.setValue(0);
    };
  }, [loading]);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const reponse = await getRecomendations(null, {
          syntoms: symptoms,
          budget: [budget.min, budget.max],
          location: selectedState,
          age: age
        })
        if (reponse) {
          setSpecialists(reponse.specialists);
        } else {
          setSpecialists([]);
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
      finally {
        setLoading(false);
      }
    }
    getData();
  }, [])

  const barWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      {loading ? (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.loadingBox}
        >
          <Text style={styles.loadingTitle}>
            Estamos trabajando en tu recomendación
          </Text>
          <Text style={styles.loadingPhrase}>
            {loadingPhrases[phraseIndex]}
          </Text>
          <View style={styles.progressBarBg}>
            <RNAnimated.View
              style={[styles.progressBar, { width: barWidth }]}
            />
          </View>
        </Animated.View>
      ) : (
        <Animated.View entering={FadeIn} style={styles.resultBox}>
          <Text style={styles.resultTitle}>
            Especialistas recomendados para ti
          </Text>
          <RecommendationListings items={specialists} />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  loadingBox: {
    alignItems: "center",
    width: "100%",
  },
  loadingTitle: {
    fontFamily: "mn-sb",
    fontSize: 18,
    color: Colors.dark.primary,
    marginBottom: 8,
    textAlign: "center",
  },
  loadingPhrase: {
    fontFamily: "mn-r",
    fontSize: 16,
    color: Colors.dark.onBackground,
    textAlign: "center",
    minHeight: 24,
    marginBottom: 24,
  },
  progressBarBg: {
    width: "100%",
    height: 12,
    backgroundColor: Colors.dark.primaryContainer,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 32,
  },
  progressBar: {
    height: 12,
    backgroundColor: Colors.dark.primary,
    borderRadius: 8,
  },
  resultBox: {
    width: "100%",
  },
  resultTitle: {
    fontFamily: "mn-sb",
    fontSize: 20,
    color: Colors.dark.primary,
    marginBottom: 16,
    textAlign: "center",
  },
  specialistCard: {
    backgroundColor: Colors.dark.primaryContainer,
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },
  specialistName: {
    fontFamily: "mn-sb",
    fontSize: 17,
    color: Colors.dark.onBackground,
  },
  specialistSpecialty: {
    fontFamily: "mn-r",
    fontSize: 15,
    color: Colors.dark.primary,
  },
  specialistLocation: {
    fontFamily: "mn-r",
    fontSize: 14,
    color: Colors.dark.outline,
  },
  emptyText: {
    textAlign: "center",
    color: Colors.dark.outline,
    marginTop: 24,
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
});

export default Result;
