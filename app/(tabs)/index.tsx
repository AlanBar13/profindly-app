import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import { getSpecialists, getSpecialistsSearch } from "@/services/specialist.service";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";

const Explore = () => {
  const { speciality, location, years } = useLocalSearchParams<{speciality?: string, location?: string, years?: string}>();
  const [category, setCategory] = useState<string>("none");
  const [search, setSearch] = useState<boolean>(speciality !== undefined || location !== undefined || years !== undefined);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["specialists", category],
    enabled: !search,
    retry: false,
    queryFn: () => getSpecialists(category),
  });

  const { data: searchData, isLoading: searchLoading, error: searchError } = useQuery({
    queryKey: ["specialists", speciality, location, years],
    enabled: search,
    retry: false,
    queryFn: () => getSpecialistsSearch(speciality, location, years),
  });

  useRefreshOnFocus(refetch);

  const onDataChange = (category: string) => {
    setCategory(category);
    setSearch(false);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChange={onDataChange} />,
        }}
      />
      <Listings items={search ? searchData || [] : data || []} loading={search ? searchLoading : isLoading} />
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
