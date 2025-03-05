import {
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Text } from "react-native-paper";
import React, { useState } from "react";
import { BookingsResponse } from "@/models/Booking";
import ExpandableCard from "./ExpandableCard";
import { Specialist } from "@/models/Specialist";
import { Colors } from "@/constants/Colors";
import { defaulStyles } from "@/constants/Styles";

interface Props {
  bookings: BookingsResponse[] | undefined;
  loading: boolean;
  refreshBookings: () => void;
  deleteBooking: (id: string) => void;
}

const BookingsList = ({ bookings, loading, refreshBookings, deleteBooking }: Props) => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const renderItem: ListRenderItem<BookingsResponse> = ({ item }) => {
    if (item.service === null) return null;

    return (
      <ExpandableCard
        headerTitle={`${item.service.label}`}
        headerText={item.bookDate}
        cardOpen={activeCard === item._id}
        setCardOpen={() => handleCardPress(item._id)}
        bodyTitle="Detalles"
      >
        <View style={styles.detailContainer}>
          <View>
            <Text style={styles.detailText}>
              Cita con: {getSpecialistName(item.service.specialist)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 5,
            }}
          >
            <Text style={styles.detailText}>Fecha: {item.bookDate}</Text>
            <Text style={styles.detailText}>Hora: {item.startTime}</Text>
            <Text style={styles.detailText}>Fin: {item.endTime}</Text>
          </View>
          <View>
            <Text style={styles.detailText}>
              Ubicación: {item.service.location}
            </Text>
          </View>
          <View style={styles.cardFooter}>
            <TouchableOpacity
              onPress={() => deleteBooking(item._id)}
              style={[
                defaulStyles.btn,
                { width: "100%", backgroundColor: Colors.dark.error },
              ]}
            >
              <Text style={defaulStyles.btnText}>Borrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ExpandableCard>
    );
  };

  const getSpecialistName = (specialist: Specialist) => {
    return `${specialist.prefix} ${specialist.user.name} ${specialist.user.lastname}`;
  };

  const handleCardPress = (id: string) => {
    setActiveCard(activeCard === id ? null : id);
  };

  const handleRefresh = async () => {
    await refreshBookings();
    setActiveCard(null);
  };

  return (
    <View>
      <FlatList
        style={{ height: "100%" }}
        data={bookings}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.noBookingsContainer}>
            <Text style={{ fontFamily: "mn-sb", fontSize: 14 }}>
              No hay citas proximas
            </Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    marginBottom: 20,
  },
  noBookingsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  detailText: {
    fontFamily: "mn-r",
    fontSize: 13,
    color: "#000",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
  },
});

export default BookingsList;
