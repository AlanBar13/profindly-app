import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import Animated, { FadeOut, FadeIn } from "react-native-reanimated";
import { ActivityIndicator, Text } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import PageHeader from "@/components/PageHeader";
import { useQuery } from "@tanstack/react-query";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import "dayjs/locale/es";
import {
  getSpecialistService,
} from "@/services/specialist.service";
import { getSpecialistScheduleByDate, createBooking } from "@/services/bookings.service";
import { defaulStyles } from "@/constants/Styles";
import { BookingSlot, CreateBooking } from "@/models/Booking";
import { useAlert } from "@/hooks/useAlert";
import { AxiosError } from "axios";
import { useAuth } from "@clerk/clerk-expo";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const Schedule = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getToken } = useAuth();
  const navigation = useNavigation();
  const { showAlert } = useAlert();
  const [date, setDate] = useState(dayjs());
  const [booking, setBooking] = useState<BookingSlot | null>(null);
  const [openCard, setOpenCard] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const { data: service, isLoading: serviceLoading } = useQuery({
    queryKey: ["service", id],
    queryFn: () => getSpecialistService(id),
  });

  const { data: bookings, isLoading: bookingsLoading } = useQuery({
    queryKey: ["bookings", id, date],
    enabled: !!service && !serviceLoading,
    queryFn: () =>
      getSpecialistScheduleByDate(service!, date.format("YYYY/MM/DD")),
    refetchInterval: 10000, //refetch every 10 seconds
  });

  const handleSelectDate = (date: dayjs.Dayjs) => {
    setDate(date);
    setOpenCard(1);
    setBooking(null);
  };

  const handleBooking = (booking: BookingSlot) => {
    setBooking(booking);
    setOpenCard(-1);
  };

  const handleCreateBooking = async () => {
    try {
      setIsLoading(true);
      if (booking && service) {
        const bookingData: CreateBooking = {
          bookDate: date.format("YYYY/MM/DD"),
          endTime: booking.end,
          service: service,
          startTime: booking.start,
          specialist: id,
        };
        const token = await getToken();
        await createBooking(bookingData, token);
        router.replace(`/(tabs)/appointment`); //use replace to avoid refetching booking data to unMount component
      } else {
        showAlert("No se pudo crear la reserva, reintente mas tarde");
      }
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
      showAlert("No se pudo crear la reserva, reintente mas tarde");
    } finally {
      setIsLoading(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground: () => (
        <View style={{ backgroundColor: Colors.dark.primary, height: 100 }} />
      ),
      headerTitleStyle: {
        fontFamily: "mn-r",
      },
      headerTitle: () => <PageHeader title="Agendar" />,
      headerLeft: () => (
        <TouchableOpacity
          style={styles.roundButton}
          onPressIn={() => router.replace(`/schedule/${id}`)}
        >
          <Ionicons name="chevron-back" size={24} color={"#000"} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {openCard != 0 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(0)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={styles.previewText}>Selecciona la fecha</Text>
            <Text style={styles.previewText}>{date.format("DD/MM/YYYY")}</Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard === 0 && (
          <>
            <Animated.Text entering={FadeIn} style={styles.cardHeader}>
              Fecha
            </Animated.Text>
            <Animated.View style={styles.cardBody}>
              <DateTimePicker
                mode="single"
                locale="es"
                selectedItemColor={Colors.dark.primary}
                date={date}
                onChange={({ date }) => handleSelectDate(dayjs(date))}
                minDate={dayjs().subtract(1, "day")}
                maxDate={dayjs().add(2, "week")}
              />
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
            <Text style={styles.previewText}>Selecciona un horario</Text>
            <Text style={styles.previewText}>
              {booking?.start} - {booking?.end}
            </Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard === 1 && (
          <>
            <Animated.Text entering={FadeIn} style={styles.cardHeader}>
              Horarios disponibles
            </Animated.Text>
            <Animated.View style={styles.cardBody}>
              {bookingsLoading && <ActivityIndicator />}
              {bookings && bookings.length > 0 ? (
                <View style={styles.bookingsContainer}>
                  {bookings.map((booking, index) => (
                    <TouchableOpacity
                      style={styles.booking}
                      key={index}
                      onPress={() => handleBooking(booking)}
                    >
                      <Text style={styles.bookingText} key={index}>
                        {booking.start} - {booking.end}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <Text style={styles.noBookingsText}>
                  No hay horarios disponibles, selecciona una fecha diferente
                </Text>
              )}
            </Animated.View>
          </>
        )}
      </View>

      <View style={styles.verifyContainer}>
        <Text style={styles.verifyText}>
          Verifica que la fecha y el horario sean correctos:{" "}
        </Text>
        <Text style={styles.verifyText}>
          {`${date.format("DD/MM/YYYY")}`}
          {booking ? `  ·  ${booking.start} - ${booking.end}` : ""}
        </Text>
        <TouchableOpacity
          style={[defaulStyles.btn, { flexDirection: "row", width: "100%" }]}
          onPress={handleCreateBooking}
        >
          <Text style={defaulStyles.btnText}>Seleccionar fecha y horario</Text>
        </TouchableOpacity>
        {isLoading && <ActivityIndicator />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    padding: 12,
  },
  roundButton: {
    backgroundColor: "#fff",
    borderBlockColor: "grey",
    borderRadius: 20,
    borderWidth: 1,
    padding: 4,
  },
  datePickerContainer: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 12,
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
    paddingBottom: 5,
  },
  bookingsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 10,
  },
  booking: {
    backgroundColor: Colors.dark.primary,
    borderRadius: 14,
    padding: 10,
    elevation: 4,
    width: "30%",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  bookingText: {
    fontFamily: "mn-sb",
    fontSize: 12,
    color: "#fff",
  },
  noBookingsText: {
    fontFamily: "mn-sb",
    fontSize: 14,
    color: "#000",
    marginBottom: 10,
  },
  verifyContainer: {
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  verifyText: {
    fontFamily: "mn-sb",
    fontSize: 14,
    color: "#fff",
  },
});

export default Schedule;
