import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { defaulStyles } from "@/constants/Styles";
import { TimerPickerModal } from "react-native-timer-picker";
import { useState } from "react";
import { Colors } from "@/constants/Colors";

type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

interface Props {
  startDate: string;
  endDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
}

const TimeSelector = ({ startDate, endDate, setStartDate, setEndDate }: Props) => {
  const [pickerVisible, setPickerVisible] = useState(false);
  const [mode, setMode] = useState(0);

  const timeIsAMFM = (hour: number) => (hour >= 12 ? "PM" : "AM");

  const openModal = (mode: number) => {
    setMode(mode);
    setPickerVisible(true);
  }

  const handleTimeChange = (date: Time) => {
    const hours = date.hours > 12 ? date.hours - 12 : date.hours;
    const minutes = date.minutes < 10 ? `0${date.minutes}` : date.minutes;
    if (mode === 0) setStartDate(`${hours}:${minutes} ${timeIsAMFM(date.hours)}`);
    else setEndDate(`${hours}:${minutes} ${timeIsAMFM(date.hours)}`);
    setPickerVisible(false);
  };

  return (
    <>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
        <Text style={defaulStyles.regularFont}>Horario de inicio: </Text>
        <TouchableOpacity onPress={() => openModal(0)}>
          <Text
            style={[defaulStyles.regularFont, { color: Colors.dark.primary }]}
          >
            {startDate}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
        <Text style={defaulStyles.regularFont}>Horario de termino: </Text>
        <TouchableOpacity onPress={() => openModal(1)}>
          <Text
            style={[defaulStyles.regularFont, { color: Colors.dark.primary }]}
          >
            {endDate}
          </Text>
        </TouchableOpacity>
      </View>
      <TimerPickerModal
        visible={pickerVisible}
        setIsVisible={setPickerVisible}
        onConfirm={(time) => handleTimeChange(time)}
        hideSeconds
        hourLabel=":"
        minuteLabel=""
        confirmButtonText="Confirmar"
        cancelButtonText="Cancelar"
      />
    </>
  );
};

export default TimeSelector;
