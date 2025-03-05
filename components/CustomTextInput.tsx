import { StyleProp, TextStyle } from "react-native";
import { TextInput } from "react-native-paper";

interface Props {
  placeholder: string;
  onChangeText?: (text: string) => void;
  value: string;
  style?: StyleProp<TextStyle>;
  multiline?: boolean;
  keyboardType?: "numeric" | "default";
  disabled?: boolean;
}

const PrTextInput = ({
  placeholder,
  onChangeText,
  value,
  style,
  multiline = false,
  keyboardType = "default",
  disabled = false,
}: Props) => {
  return (
    <TextInput
      style={style}
      outlineStyle={{ borderRadius: 10, backgroundColor: "#fff" }}
      contentStyle={{ fontFamily: "mn-r", color: "#000" }}
      mode="outlined"
      placeholder={placeholder}
      placeholderTextColor="#000"
      cursorColor="#000"
      activeOutlineColor="#000"
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      multiline={multiline}
      disabled={disabled}
    />
  );
};

export default PrTextInput;
