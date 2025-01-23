import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { Stack } from "expo-router";
import { useAlert } from "@/hooks/useAlert";
import { useQuery } from "@tanstack/react-query";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import { getAllSpecialists } from "@/services/specialist.service";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";

const Explore = () => {
  const { showAlert } = useAlert();
  const [category, setCategory] = useState("General");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["specialists"],
    queryFn: getAllSpecialists,
  });
  useRefreshOnFocus(refetch);

  if (error) {
    showAlert("Error al cargar especialistas");
  }

  const onDataChange = (category: string) => {
    setCategory(category);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChange={onDataChange} />,
        }}
      />
      <Listings items={data || []} category={category} loading={isLoading} />
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
