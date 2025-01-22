import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { Specialist } from "@/models/Specialist";
import { useAlert } from "@/hooks/useAlert";
import { useApi } from "@/hooks/useApi";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";

const Explore = () => {
  const { showAlert } = useAlert();
  const api = useApi()
  const [category, setCategory] = useState("General")
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

  const onDataChange = (category: string) => {
    setCategory(category)
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        header: () => <ExploreHeader onCategoryChange={onDataChange} />
      }} />
      <Listings items={specialists} category={category} loading={loading} />
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
