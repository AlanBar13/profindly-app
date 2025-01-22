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
})