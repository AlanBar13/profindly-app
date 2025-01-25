import { View, Text, StyleSheet } from "react-native";

const ScheduleHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendar</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "mn-b",
    fontSize: 24,
    color: "#000",
  },
});

export default ScheduleHeader;
