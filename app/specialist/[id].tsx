import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Share,
} from "react-native";
import { useEffect, useLayoutEffect, useState } from "react";
import { useLocalSearchParams, useNavigation, router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Snackbar, Text } from "react-native-paper";
import * as Linking from "expo-linking";
import { defaulStyles } from "@/constants/Styles";
import { getSpecialistById } from "@/services/specialist.service";
import { useAuth } from "@clerk/clerk-expo";
import { Specialist } from "@/models/Specialist";
import { AxiosError } from "axios";
import { useAlert } from "@/hooks/useAlert";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 300;

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isSignedIn } = useAuth();
  const { showAlert } = useAlert();
  const scrollOffset = useSharedValue(0);
  const navigation = useNavigation();
  const [specialist, setSpecialist] = useState<Specialist>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await getSpecialistById(id);
        setSpecialist(data);
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.response?.data);
        showAlert("Error al cargar el especialista");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTransparent: true,

      headerBackground: () => (
        <Animated.View
          style={[headerAnimatedStyle, styles.header]}
        ></Animated.View>
      ),
      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity
            style={styles.roundButton}
            onPressIn={() => shareSpecialist()}
          >
            <Ionicons name="share-outline" size={22} color={"#000"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="heart-outline" size={22} color={"#000"} />
          </TouchableOpacity>
        </View>
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
  }, [specialist]);

  const shareSpecialist = async () => {
    try {
      const title = `${specialist?.user.name} ${specialist?.user.lastname}`;
      const url = Linking.createURL(`/specialist/${id}`);
      const message = `Conoce a ${specialist?.prefix} ${specialist?.user.name} ${specialist?.user.lastname} en NexoMedix: ${url}`;

      await Share.share({
        title: title,
        message,
        url: url,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      scrollOffset.value = contentOffset.y;
    },
  });

  const goToSchedulePage = () => {
    if (isSignedIn) {
      router.push(`/schedule/${id}`);
    } else {
      router.push(`/(modals)/login`);
    }
  };

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 2], [0, 1]),
    };
  }, []);

  if (isLoading || !specialist) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={Colors.dark.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        contentContainerStyle={{ paddingBottom: 100 }}
        scrollEventThrottle={16}
        entering={SlideInDown}
      >
        <Animated.Image
          source={{ uri: specialist.photoLink }}
          style={[styles.image, imageAnimatedStyle]}
          resizeMode="cover"
        />
        <View style={styles.infoContainer}>
          <Text
            style={styles.name}
          >{`${specialist.prefix} ${specialist.user.name} ${specialist.user.lastname}`}</Text>
          <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
            <Ionicons
              name="location-outline"
              size={18}
              color={Colors.dark.primary}
            />
            <Text style={styles.location}>{specialist.location}</Text>
          </View>
          <Text style={styles.briefText}>{specialist.briefDescription}</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Text style={styles.infoText}>{specialist.rating}</Text>
              <Ionicons name="star" size={16} color={Colors.dark.primary} />
              <Text style={styles.infoText}>
                · {specialist.reviews.length} reviews
              </Text>
            </View>
            <Text style={styles.infoText}>
              {specialist.experience} años de experiencia
            </Text>
          </View>
          <View style={styles.divider} />
          <Text style={styles.description}>{specialist.description}</Text>
          <View style={styles.divider} />
          <View style={styles.infoSection}>
            <Text style={{ fontFamily: "mn-b" }}>Especialidad:</Text>
            <Text style={{ fontFamily: "mn-r" }}>
              {specialist.speciality.toString().replace(/,/g, ", ")}
            </Text>
          </View>
          <View style={styles.infoSection}>
            <Text style={{ fontFamily: "mn-b" }}>Sub-Especialidades:</Text>
            <Text style={{ fontFamily: "mn-r" }}>
              {specialist.subspecialities.toString().replace(/,/g, ", ")}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoSection}>
            <Text style={{ fontFamily: "mn-b" }}>Horarios de atención:</Text>
            <Text style={{ fontFamily: "mn-r" }}>{specialist.schedule}</Text>
          </View>
        </View>
      </Animated.ScrollView>

      <Animated.View
        style={defaulStyles.footer}
        entering={SlideInDown.delay(200)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={styles.footerText}>
            <Text style={styles.footerPrice}>
              $ {specialist.budgetRange[0]} - {specialist.budgetRange[1]}
            </Text>
            <Text style={[styles.footerPrice, { fontSize: 12 }]}>
              la consulta
            </Text>
          </TouchableOpacity>

          {(specialist.services && specialist.services.length > 0) && (
            <TouchableOpacity
              style={[defaulStyles.btn, { paddingRight: 20, paddingLeft: 20 }]}
              onPress={goToSchedulePage}
            >
              <Text style={defaulStyles.btnText}>Agendar Cita</Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  image: {
    height: IMG_HEIGHT,
    width: width,
  },
  infoContainer: {
    padding: 24,
    backgroundColor: Colors.dark.background,
  },
  name: {
    color: Colors.dark.primary,
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "mn-b",
  },
  location: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: "mn-sb",
  },
  briefText: {
    fontSize: 16,
    color: "grey",
    marginVertical: 4,
    fontFamily: "mn-r",
  },
  infoText: {
    fontSize: 16,
    fontFamily: "mn-sb",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "grey",
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "grey",
  },
  infoSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  footerText: {
    height: "100%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerPrice: {
    fontSize: 18,
    fontFamily: "mn-sb",
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
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  header: {
    backgroundColor: Colors.dark.primary,
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "grey",
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: "mn-r",
  },
});

export default Page;
