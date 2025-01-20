import { StyleSheet, View } from "react-native";
import { Text, Button } from "react-native-paper";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import { Specialist } from "@/models/Specialist";
import { useAlert } from "@/hooks/useAlert";
import { useApi } from "@/hooks/useApi";

const Explore = () => {
  const { showAlert } = useAlert();
  const api = useApi()
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSpecialists = async () => {
      try {
        setLoading(true);
        const res = await api.specialist.getAll();
        setSpecialists(res);
      } catch (error) {
        console.log("Error getting specialists");
        showAlert("Error al cargar especialistas");
      } finally {
        setLoading(false);
      }
    };

    getSpecialists();
  }, []);

  return (
    <View style={styles.container}>
      <Link href={"/(modals)/login"}>
        <Text>Login</Text>
      </Link>
      <Link href={"/(modals)/schedule"}>
        <Text>Schedule</Text>
      </Link>
      <Link href={"/specialist/123"}>
        <Text>Specilist detail page</Text>
      </Link>
      <Text>Home</Text>
      <Button
        mode="contained"
        onPress={() => {
          showAlert("test");
        }}
      >
        Mostrar error
      </Button>
      {specialists.map((specialist) => (
        <Text key={specialist._id}>{specialist.name}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
});

export default Explore;
