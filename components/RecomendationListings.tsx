import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { AISpecialist } from "@/models/Recomendation";
import { Link } from "expo-router";

interface Props {
  items: AISpecialist[];
}

const RecommendationListings = ({ items }: Props) => {
  const renderRow: ListRenderItem<AISpecialist> = ({ item }) => (
    <Link href={`/specialist/${item.id}`} asChild>
      <TouchableOpacity>
        <Animated.View
          style={styles.listing}
          entering={FadeInRight}
          exiting={FadeOutLeft}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "column", gap: 2 }}>
              <Text style={styles.name}>{item.especialista}</Text>
              <Text style={styles.specialty}>{item.especialidad}</Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Ionicons
                name="location-outline"
                size={16}
                color={Colors.dark.primary}
              />
              <Text style={styles.location}>{item.ubicacion}</Text>
            </View>
          </View>
          {item.subespecialidades && (
            <Text style={styles.subspecialties}>
              Subespecialidades: {item.subespecialidades}
            </Text>
          )}
          <Text style={styles.budget}>Presupuesto: {item.presupuesto}</Text>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        renderItem={renderRow}
        data={items}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No se encontraron especialistas</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 8,
    marginVertical: 10,
    backgroundColor: Colors.dark.primaryContainer,
    borderRadius: 16,
  },
  name: {
    fontFamily: "mn-sb",
    fontSize: 16,
    color: Colors.dark.onBackground,
  },
  specialty: {
    fontFamily: "mn-r",
    fontSize: 14,
    color: Colors.dark.primary,
  },
  location: {
    fontFamily: "mn-r",
    fontSize: 13,
    color: Colors.dark.outline,
  },
  subspecialties: {
    fontFamily: "mn-r",
    fontSize: 13,
    color: Colors.dark.outline,
  },
  budget: {
    fontFamily: "mn-sb",
    fontSize: 13,
    color: Colors.dark.primary,
    marginTop: 4,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 24,
  },
  emptyText: {
    fontFamily: "mn-sb",
    color: Colors.dark.outline,
    fontSize: 16,
  },
  loadingText: {
    fontFamily: "mn-sb",
    color: Colors.dark.primary,
    fontSize: 16,
  },
});

export default RecommendationListings;
