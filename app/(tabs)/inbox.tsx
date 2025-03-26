import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Notification } from "@/models/Notifications";
import { defaulStyles } from "@/constants/Styles";
import { useNotification } from "@/hooks/useNotifications";
import {
  getNotifications,
  notificationMarkAsRead,
} from "@/services/notifications.service";
import { useAuth } from "@clerk/clerk-expo";
import { AxiosError } from "axios";
import NotificationList from "@/components/NotificationList";
import NotSignedIn from "@/components/NotSignedIn";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Page = () => {
  const { getToken, isSignedIn } = useAuth();
  const { expoPushToken, notification } = useNotification();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const { isLoading, error, refetch } = useQuery({
    queryKey: ["notifications"],
    enabled: isSignedIn,
    queryFn: async () => {
      try {
        const token = await getToken();
        const data = await getNotifications(token);
        setNotifications(data);
        return data;
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.response?.data);
      }
    },
  });

  const goToNotificationDetail = async (id: string) => {
    try {
      const token = await getToken();
      const notification = notifications.find((n) => n._id === id);
      if (!notification?.read) {
        console.log("Marking as read");
        await notificationMarkAsRead(id, token);
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification._id === id
              ? { ...notification, read: true }
              : notification
          )
        );
      }

      router.push(`/notification/${id}`);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
    }
  };

  useRefreshOnFocus(refetch);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {isSignedIn ? (
          <View>
            <View style={defaulStyles.titleContainer}>
              <Text style={defaulStyles.title}>Notificaciones</Text>
            </View>
            <NotificationList
              notifications={notifications}
              refreshNotifications={refetch}
              notificationPressed={goToNotificationDetail}
              loading={isLoading}
            />
          </View>
        ) : (
          <NotSignedIn title="Notificaciones" />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    height: "94%",
  },
});

export default Page;
