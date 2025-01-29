import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useEffect, useRef } from "react";
import { Specialist } from "@/models/Specialist";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Avatar } from "react-native-paper";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { Colors } from "@/constants/Colors";

interface Props {
  items: Specialist[];
  loading: boolean;
}

const Listings = ({ items, loading }: Props) => {
  const listRef = useRef<FlatList>(null);

  const renderRow: ListRenderItem<Specialist> = ({ item }) => (
    <Link href={`/specialist/${item._id}`} asChild>
      <TouchableOpacity>
        <Animated.View
          style={styles.listing}
          entering={FadeInRight}
          exiting={FadeOutLeft}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Avatar.Image size={32} source={{ uri: item.photo_link }} />
              <Text
                style={{ fontSize: 16, fontFamily: "mn-sb" }}
              >{`${item.prefix} ${item.user.name} ${item.user.lastname} `}</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Text style={{ fontFamily: "mn-sb" }}>
                {item.rating ? item.rating : "N/A"}
              </Text>
              <Ionicons name="star" size={16} color={Colors.dark.primary} />
            </View>
          </View>

          <Text style={{ fontSize: 12, fontFamily: "mn-r" }}>
            {item.brief_description}
          </Text>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontFamily: "mn-sb", fontSize: 12 }}>
              $ {item.budget_range[0]} - {item.budget_range[1]} por hora
            </Text>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Ionicons name="location-outline" size={16} />
              <Text style={{ fontFamily: "mn-r", fontSize: 12 }}>
                {item.location}
              </Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );
  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        renderItem={renderRow}
        ref={listRef}
        data={items}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text
                style={{ fontFamily: "mn-sb", color: "#fff", fontSize: 16 }}
              >
                No se encontraron resultados
              </Text>
            )}
          </View>
        }
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 22,
  },
});

export default Listings;
