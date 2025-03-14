import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const defaulStyles = StyleSheet.create({
  footer: {
    position: "absolute",
    height: 100,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.dark.background,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopColor: "grey",
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  btn: {
    backgroundColor: Colors.dark.primary,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: Colors.dark.background,
    fontSize: 16,
    fontFamily: "mn-b",
  },
  regularFont: {
    fontFamily: "mn-r",
    color: "#ffff"
  },
  semiboldFont: {
    fontFamily: "mn-sb",
  },
  boldFont: {
    fontFamily: "mn-b",
  },
  inputContainer: {
    marginVertical: 5,
  },
  inputTitle: {
    fontFamily: "mn-r",
    fontSize: 18,
    padding: 6,
  },
  optionContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  option: {
    marginRight: 5,
  },
  optionSelected: {
    backgroundColor: Colors.dark.inversePrimary,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  title: {
    fontFamily: "mn-sb",
    fontSize: 24,
    color: "#fff",
  },
});
