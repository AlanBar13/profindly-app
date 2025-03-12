import {
  View,
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native-paper";
import { Notification } from "@/models/Notifications";
import { defaulStyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import DateUtils from "@/utils/date";

interface Props {
  notifications: Notification[];
  loading: boolean;
  refreshNotifications: () => void;
  markAsRead: (id: string) => void
}

const NotificationList = ({
  notifications,
  loading,
  refreshNotifications,
  markAsRead
}: Props) => {
  const renderItem: ListRenderItem<Notification> = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => markAsRead(item._id)}>
        <View style={styles.notificationContainer}>
          {!item.read && <View style={styles.notificationStatus} />}
          <View style={!item.read && { marginLeft: 10 }}>
            <Text style={[defaulStyles.semiboldFont, { fontSize: 16 }]}>
              {item.title}
            </Text>
            <Text style={defaulStyles.regularFont}>
              {item.from.name} {item.from.lastname}
            </Text>
            <Text style={defaulStyles.regularFont}>{item.message}</Text>
            <Text style={[defaulStyles.regularFont, { fontSize: 12 }]}>
              {DateUtils.formatISOString(item.createdAt)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        ListEmptyComponent={
          <View>
            <Text style={defaulStyles.regularFont}>No hay notificaciones</Text>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refreshNotifications}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    width: "100%",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#ffff",
    padding: 10,
    flexDirection: "row",
  },
  notificationStatus: {
    width: "1%",
    backgroundColor: Colors.dark.primary,
  },
  notificationContent: {
    marginLeft: 10,
  },
});

export default NotificationList;
