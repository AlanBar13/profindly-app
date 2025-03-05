import { View, Text, ScrollView } from "react-native";
import React from "react";
import { defaulStyles } from "@/constants/Styles";
import { Chip } from "react-native-paper";

interface Props {
    options: { id: string; name: string }[];
    selected: string;
    setSelected: (id: string) => void;
}

const SelectorComponent = ({ options, selected, setSelected }: Props) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={defaulStyles.optionContainer}
    >
      {options.map((opt, i) => (
        <Chip
          key={i}
          style={[
            defaulStyles.option,
            selected === opt.id && defaulStyles.optionSelected,
          ]}
          onPress={() => setSelected(opt.id)}
        >
          <Text style={{ fontFamily: "mn-r" }}>{opt.name}</Text>
        </Chip>
      ))}
    </ScrollView>
  );
};

export default SelectorComponent;
