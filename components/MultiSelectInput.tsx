import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import PrTextInput from "./CustomTextInput";
import { defaulStyles } from "@/constants/Styles";
import { Chip } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
  onAdd: () => void;
  onRemove: (index: number) => void;
  selectedValues: string[];
  keyboardType?: "numeric" | "default";
}

const MultiSelectInput = ({
  placeholder,
  onChangeText,
  value,
  onAdd,
  onRemove,
  keyboardType,
  selectedValues = [],
}: Props) => {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          justifyContent: "space-between",
        }}
      >
        <PrTextInput
          style={{ width: "70%" }}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
        />
        <TouchableOpacity
          style={[defaulStyles.btn, { width: "25%", height: "auto" }]}
          onPress={onAdd}
        >
          <Text style={defaulStyles.btnText}>Añadir</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 10, flexDirection: "row", gap: 2 }}>
        {selectedValues.map((value, i) => (
          <Chip key={i} onPress={() => onRemove(i)}>
            <Text>{value}</Text>
            <Ionicons name="close" size={12} />
          </Chip>
        ))}
      </View>
    </>
  );
};

export default MultiSelectInput;
