import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { deleteBooking, getBookings } from "@/services/bookings.service";
import { useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { defaulStyles } from "@/constants/Styles";
import BookingsList from "@/components/BookingsList";
import { useEffect, useState } from "react";
import { BookingsResponse } from "@/models/Booking";
import NotSignedIn from "@/components/NotSignedIn";

const Appointments = () => {
  const { getToken, isSignedIn } = useAuth();
  const [bookings, setBookings] = useState<BookingsResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getBookingsData = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const bookings = await getBookings(token);
      setBookings(bookings);
    } catch (error) {
      setError("Error al cargar las citas");
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      getBookingsData();
    }
  }, [isSignedIn]);

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
              <View style={defaulStyles.titleContainer}>
                <Text style={defaulStyles.title}>Citas proximas</Text>
              </View>
              <View>
                <BookingsList
                  bookings={bookings}
                  loading={loading}
                  deleteBooking={handleDeleteBooking}
                  refreshBookings={getBookingsData}
                />
              </View>
            </View>
          )}
        </View>
      ) : (
        <NotSignedIn title="Citas" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 12,
  }
});

export default Appointments;
