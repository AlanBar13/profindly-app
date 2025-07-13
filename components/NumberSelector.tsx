import { Ionicons } from '@expo/vector-icons'
import { View, Text, StyleSheet, TouchableOpacity, StyleProp, TextStyle } from 'react-native'
import { Colors } from '@/constants/Colors'

interface Props {
    value: number;
    add: () => void;
    remove: () => void;
    min: number;
    max: number;
    textStyle?: StyleProp<TextStyle>
}

const NumberSelector = ({ value, add, remove, min, max, textStyle }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity disabled={value <= min} style={styles.button} onPress={remove}>
        <Ionicons name='remove' size={24} color="#000" />
      </TouchableOpacity>
      <Text style={textStyle !== undefined ? textStyle : styles.numberText}>{value}</Text>
      <TouchableOpacity disabled={value >= max} style={styles.button} onPress={add}>
        <Ionicons name='add' size={24} color="#000" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        paddingVertical: 0,
    },
    button: {
        backgroundColor: "#fff",
        borderRadius: 30,
        padding: 10,
        borderWidth: 1,
        borderColor: "#000"
    },
    numberText: {
        fontSize: 20,
        fontFamily: "mn-sb",
        color: Colors.dark.primary,
        borderWidth: 0,
        padding: 4,
        borderRadius: 6,
    }
})

export default NumberSelector