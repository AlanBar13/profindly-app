import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useLayoutEffect, useEffect, useState } from "react";
import { ActivityIndicator, Text } from "react-native-paper";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { Colors } from "@/constants/Colors";
import PageHeader from "@/components/PageHeader";
import { Ionicons } from "@expo/vector-icons";
import {
  getNotification,
  deleteNotification,
} from "@/services/notifications.service";
import { useAuth } from "@clerk/clerk-react";
import { Notification as NotificationType } from "@/models/Notifications";
import DateUtils from "@/utils/date";
import { defaulStyles } from "@/constants/Styles";
import { AxiosError } from "axios";
import { useAlert } from "@/hooks/useAlert";
import { acceptBooking, cancelBooking } from "@/services/bookings.service";

const Notification = () => {
  const { getToken } = useAuth();
  const navigation = useNavigation();
  const { showAlert } = useAlert();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<NotificationType>();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const token = await getToken();
        const notification = await getNotification(id, token);
        setNotification(notification);
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.response?.data);
        showAlert("Error al cargar la notificación");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const deleteNotif = async () => {
    try {
      await deleteNotification(id);
      router.back();
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
      showAlert("Error al eliminar la notificación");
    }
  };

  const confirmBooking = async () => {
    try {
      if (!notification?.booking) return;
      setLoading(true);
      const token = await getToken();
      await acceptBooking(token, notification.booking._id);
      setNotification((prev) => {
        if (prev) {
          return {
            ...prev,
            booking: {
              ...prev.booking!,
              status: "booked",
            },
          };
        }
      });
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
      showAlert("Error al aceptar la notificación");
    } finally {
      setLoading(false);
    }
  };

  const cancel = async () => {
    try {
      if (!notification?.booking || !notification?.from.notificationToken)
        return;
      setLoading(true);
      const token = await getToken();
      await cancelBooking(
        token,
        notification.booking._id,
        notification.from.notificationToken
      );
      setNotification((prev) => {
        if (prev) {
          return {
            ...prev,
            booking: {
              ...prev.booking!,
              status: "cancelled",
            },
          };
        }
      });
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
      showAlert("Error al cancelar la notificación");
    } finally {
      setLoading(false);
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
      headerTitle: () => <PageHeader title="Notificación" />,
      headerLeft: () => (
        <TouchableOpacity
          style={styles.roundButton}
          onPressIn={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={"#000"} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={styles.roundButton}
          onPressIn={() => deleteNotif()}
        >
          <Ionicons name="trash" size={24} color={"#000"} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator />}
      {notification && (
        <>
          <Text style={defaulStyles.title}>{notification.title}</Text>
          <Text style={[defaulStyles.semiboldFont, { fontSize: 20 }]}>
            De: {notification.from.name} {notification.from.lastname}
          </Text>
          <Text style={[defaulStyles.regularFont, { fontSize: 18 }]}>
            {DateUtils.formatISOString(notification.createdAt)}
          </Text>
          {notification.booking && (
            <View>
              <Text
                style={[
                  defaulStyles.semiboldFont,
                  { fontSize: 18, marginTop: 20 },
                ]}
              >
                Detalles de la cita:
              </Text>
              <Text style={[defaulStyles.regularFont, { fontSize: 18 }]}>
                Fecha: {notification.booking.bookDate}
              </Text>
              <Text style={[defaulStyles.regularFont, { fontSize: 18 }]}>
                Hora: {notification.booking.startTime} -{" "}
                {notification.booking.endTime}
              </Text>
              {notification.booking.status === "pending" && (
                <View style={styles.actionContainer}>
                  <Text style={[defaulStyles.regularFont, { fontSize: 18 }]}>
                    Aceptar Cita?
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: 20,
                    }}
                  >
                    <TouchableOpacity
                      style={[defaulStyles.btn, { width: 100 }]}
                      onPress={cancel}
                    >
                      <Ionicons name="close" size={24} color={"#000"} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[defaulStyles.btn, { width: 100 }]}
                      onPress={confirmBooking}
                    >
                      <Ionicons name="checkmark" size={24} color={"#000"} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          )}
        </>
      )}
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
  actionContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});

export default Notification;
