import { TextInput } from "react-native-paper";

interface Props {
  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
}

const PrTextInput = ({ placeholder, onChangeText, value }: Props) => {
  return (
    <TextInput
      outlineStyle={{ borderRadius: 10, backgroundColor: "#fff" }}
      contentStyle={{ fontFamily: "mn-r", color: "#000" }}
      mode="outlined"
      placeholder={placeholder}
      placeholderTextColor="#000"
      cursorColor="#000"
      activeOutlineColor="#000"
      value={value}
      onChangeText={onChangeText}
    />
  );
};

export default PrTextInput;
