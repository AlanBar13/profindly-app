import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useRef, useState } from "react";
import * as Haptics from "expo-haptics";

interface Categories {
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}

interface Props {
  onCategoryChange: (category: string) => void;
}

const categories: Categories[] = [
  { name: "Medicina", icon: "medical-services" },
  { name: "Salud Mental", icon: "psychology" },
  { name: "Salud Física", icon: "accessibility" },
  { name: "Nutrición", icon: "food-bank" },
  { name: "Oftalmología", icon: "remove-red-eye" },
  { name: "Veterinaria", icon: "pets" },
  { name: "Enfermería", icon: "health-and-safety" },
  { name: "Odontología", icon: "mood" },
];

const ExploreHeader = ({ onCategoryChange }: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemRef = useRef<Array<View | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectCategory = (index: number) => {
    const selected = itemRef.current[index];
    setActiveIndex(index);

    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
    });

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChange(categories[index].name);
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <Link href="/(modals)/filter" asChild>
            <TouchableOpacity style={styles.searchButton}>
              <Ionicons name="search" size={24} />
              <View>
                <Text style={{ fontFamily: "mn-b" }}>
                  Encuentra especialistas
                </Text>
                <Text style={{ fontFamily: "mn-r" }}>Donde sea</Text>
              </View>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={28} />
          </TouchableOpacity>
        </View>

        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            gap: 20,
            paddingHorizontal: 16,
          }}
        >
          {categories.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => selectCategory(index)}
              ref={(el) => (itemRef.current[index] = el)}
              style={
                activeIndex === index
                  ? styles.categoriesButtonActive
                  : styles.categoriesButton
              }
            >
              <MaterialIcons
                size={25}
                name={item.icon}
                color={
                  activeIndex === index
                    ? Colors.dark.onPrimary
                    : Colors.dark.backdrop
                }
              />
              <Text
                style={
                  activeIndex === index
                    ? styles.categoryActiveText
                    : styles.categoryText
                }
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.primary,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 10,
  },
  filterButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.dark.surface,
    borderRadius: 24,
    marginTop: 8,
  },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderColor: Colors.dark.primary,
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: 5,
    flex: 1,
    padding: 14,
    borderRadius: 30,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: Colors.dark.shadow,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  categoryText: {
    fontSize: 14,
    fontFamily: "mn-r",
    color: Colors.dark.backdrop,
  },
  categoryActiveText: {
    fontSize: 14,
    fontFamily: "mn-b",
    color: Colors.dark.onPrimary,
  },
  categoriesButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
  },
  categoriesButtonActive: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
    borderBottomColor: Colors.dark.onPrimary,
    borderBottomWidth: 2,
  },
});

export default ExploreHeader;
