import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import {
  deleteBooking,
  getBookings,
  getSpecialistBookings,
} from "@/services/bookings.service";
import { useAuth } from "@clerk/clerk-expo";
import { defaulStyles } from "@/constants/Styles";
import BookingsList from "@/components/BookingsList";
import { useEffect, useState } from "react";
import { BookingsResponse } from "@/models/Booking";
import NotSignedIn from "@/components/NotSignedIn";
import useProfile from "@/hooks/useProfile";
import { Colors } from "@/constants/Colors";

const Appointments = () => {
  const { getToken, isSignedIn } = useAuth();
  const user = useProfile((state) => state.user);
  const [bookings, setBookings] = useState<BookingsResponse[]>([]);
  const [specbookings, setSpecBookings] = useState<BookingsResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<string>("user");

  const getBookingsData = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const bookings = await getBookings(token);
      setBookings(bookings);
    } catch (error) {
      setError("Error al cargar las citas");
    } finally {
      setLoading(false);
    }
  };

  const getSpecialistBookingsData = async (specialistId: string) => {
    try {
      setLoading(true);
      const token = await getToken();
      const bookings = await getSpecialistBookings(token, specialistId);
      setSpecBookings(bookings);
    } catch (error) {
      setError("Error al cargar las citas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      getBookingsData();
      if (user.specialist) {
        // Get specialist bookings
        getSpecialistBookingsData(user.specialist);
      }
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
                {user.specialist && specbookings.length > 0 && (
                  <View style={{ flexDirection: "row", gap: 12 }}>
                    <TouchableOpacity onPress={() => setVisible("user")}>
                      <Text style={[styles.textButton, visible === "user" && styles.selected]}>Personales</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setVisible("specialist")}>
                      <Text style={[styles.textButton, visible === "specialist" && styles.selected]}>Especialista</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <View>
                <BookingsList
                  bookings={visible === "user" ? bookings : specbookings}
                  loading={loading}
                  specialist={visible === "specialist"}
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
  },
  textButton: {
    color: Colors.dark.primary,
    fontFamily: "mn-r",
    fontSize: 16,
  },
  selected: {
    borderBottomColor: Colors.dark.primary,
    borderBottomWidth: 2,
  }
});

export default Appointments;
