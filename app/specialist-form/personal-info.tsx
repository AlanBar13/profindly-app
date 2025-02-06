import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native-paper";
import useFormState from "@/hooks/useFormState";
import PrTextInput from "@/components/CustomTextInput";
import useProfile from "@/hooks/useProfile";

const PersonalInfo = () => {
  const user = useProfile((state) => state.user)
  const prefix = useFormState((state) => state.data.prefix);
  const setPrefix = useFormState((state) => state.setPrefix);
  const briefDesc = useFormState((state) => state.data.brief_description);
  const setBriefDesc = useFormState((state) => state.setBriefDesc);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Información Personal</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Nombre(s): {user.name}</Text>
          <Text style={styles.infoText}>Apellido(s): {user.lastname}</Text>
        </View>
        <View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Prefijo:</Text>
            <PrTextInput placeholder="Prefijo" onChangeText={setPrefix} value={prefix} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Breve Descripción:</Text>
            <PrTextInput placeholder="Breve Descripción" onChangeText={setBriefDesc} value={briefDesc} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    marginTop: 50,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 10
  },
  headerTitle: {
    fontFamily: "mn-sb",
    fontSize: 24,
  },
  infoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  infoText: {
    fontFamily: "mn-r",
    fontSize: 18
  },
  inputContainer: {
    marginBottom: 5
  },
  inputTitle: {
    fontFamily: "mn-r",
    fontSize: 18,
    padding: 6
  }
});

export default PersonalInfo;
