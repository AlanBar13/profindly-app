import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { BlurView } from "expo-blur";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
} from "react-native-reanimated";
import { defaulStyles } from "@/constants/Styles";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import FilterTextInput from "@/components/FilterTextInput";
import NumberSelector from "@/components/NumberSelector";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const Page = () => {
  const [openCard, setOpenCard] = useState(0);
  const [filterForm, setFilterForm] = useState<FilterForm>({
    specialty: "",
    location: "",
    experience: 1,
  });

  const submitFilters = () => {
    console.log(filterForm)
    router.back()
  }

  const onClearAll = () => {
    setFilterForm({
      specialty: "",
      location: "",
      experience: 1,
    });
    setOpenCard(0);
  };

  const addExperience = () => {
    setFilterForm({ ...filterForm, experience: filterForm.experience + 1 });
  };

  const removeExperience = () => {
    setFilterForm({ ...filterForm, experience: filterForm.experience - 1 });
  };

  return (
    <BlurView intensity={120} tint="light" style={styles.container}>
      <View style={styles.card}>
        {openCard != 0 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(0)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={styles.previewText}>Por especialidad</Text>
            <Text style={styles.previewText}>{filterForm.specialty ? filterForm.specialty : "Todas"}</Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard === 0 && (
          <>
            <Animated.Text entering={FadeIn} style={styles.cardHeader}>Especialidad</Animated.Text>
            <Animated.View style={styles.cardBody}>
              <FilterTextInput placeholder="Buscar especialidad" onChangeText={(text) => setFilterForm({ ...filterForm, specialty: text.trim() })} value={filterForm.specialty} />
            </Animated.View>
          </>
        )}
      </View>

      <View style={styles.card}>
        {openCard != 1 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(1)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={styles.previewText}>Por ubicación</Text>
            <Text style={styles.previewText}>{filterForm.location ? filterForm.location : "Todas"}</Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard === 1 && (
          <>
            <Animated.Text entering={FadeIn} style={styles.cardHeader}>Ubicación</Animated.Text>
            <Animated.View style={styles.cardBody}>
              <FilterTextInput placeholder="Buscar ubicación" onChangeText={(text) => setFilterForm({ ...filterForm, location: text.trim() })} value={filterForm.location} />
            </Animated.View>
          </>
        )}
      </View>

      <View style={styles.card}>
        {openCard !== 2 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(2)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={styles.previewText}>Por años de experiencia</Text>
            <Text style={styles.previewText}>{filterForm.experience > 1 ? `${filterForm.experience} años` : "Todas"}</Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard === 2 && (
          <>
            <Animated.Text entering={FadeIn} style={styles.cardHeader}>Años de experiencia</Animated.Text>
            <Animated.View style={[styles.cardBody, { justifyContent: "center", alignItems: "center" }]}>
              <NumberSelector value={filterForm.experience} add={addExperience} remove={removeExperience} min={1} max={10} />
            </Animated.View>
          </>
        )}
      </View>

      <Animated.View
        style={[defaulStyles.footer, { backgroundColor: "#fff" }]}
        entering={SlideInDown.delay(200)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={onClearAll}
            style={{ justifyContent: "center" }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "mn-sb",
                textDecorationLine: "underline",
              }}
            >
              Clear All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={submitFilters}
            style={[defaulStyles.btn, { paddingHorizontal: 20 }]}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Ionicons name="search-outline" size={24} />
              <Text style={defaulStyles.btnText}>Buscar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    margin: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    gap: 20,
  },
  previewText: {
    fontFamily: "mn-sb",
    fontSize: 14,
    color: "#000",
  },
  cardPreview: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  cardHeader: {
    fontFamily: "mn-b",
    fontSize: 24,
    padding: 20,
  },
  cardBody: {
    paddingHorizontal: 20,
    paddingBottom: 20
  }
});

export default Page;
