import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { deleteBooking, getBookings } from "@/services/bookings.service";
import { useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { defaulStyles } from "@/constants/Styles";
import BookingsList from "@/components/BookingsList";
import { useEffect, useState } from "react";
import { BookingsResponse } from "@/models/Booking";

const Appointments = () => {
  const { getToken, isSignedIn } = useAuth();
  const [bookings, setBookings] = useState<BookingsResponse[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getBookingsData = async () => {
    try {
      const token = await getToken();
      const bookings = await getBookings(token);
      setBookings(bookings);
    } catch (error) {
      setError("Error al cargar las citas");
    }
  };

  useEffect(() => {
    getBookingsData();
  }, []);

  const handleDeleteBooking = async (id: string) => {
    const token = await getToken();
    await deleteBooking(token, id);
    setBookings(bookings.filter((booking) => booking._id !== id));
  };

  return (
    <View style={styles.container}>
      {isSignedIn ? (
        <View>
          {error ? (
            <Text>Error al cargar las citas</Text>
          ) : (
            <View>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Citas proximas</Text>
              </View>
              <View>
                <BookingsList
                  bookings={bookings}
                  deleteBooking={handleDeleteBooking}
                  refreshBookings={getBookingsData}
                />
              </View>
            </View>
          )}
        </View>
      ) : (
        <View>
          <Text
            style={{ fontFamily: "mn-sb", marginBottom: 12 }}
            variant="headlineLarge"
          >
            Citas
          </Text>
          <Text
            style={{ fontFamily: "mn-r", marginBottom: 12 }}
            variant="bodyLarge"
          >
            Si quieres tener acceso a esta funcionalidad, registrate o inicia
            sesion dando click en el siguiente boton:
          </Text>
          <Link href="/(modals)/login" asChild>
            <TouchableOpacity style={defaulStyles.btn}>
              <Text style={defaulStyles.btnText}>Iniciar Sesion</Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 12,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  title: {
    fontFamily: "mn-sb",
    fontSize: 24,
    color: "#fff",
  },
});

export default Appointments;
