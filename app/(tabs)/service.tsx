import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Switch, Text } from "react-native-paper";
import { defaulStyles } from "@/constants/Styles";
import PrTextInput from "@/components/CustomTextInput";
import { useEffect, useMemo, useState } from "react";
import { Colors } from "@/constants/Colors";
import TimeSelector from "@/components/TimeSelector";
import SelectorComponent from "@/components/SelectorComponent";
import { Service, Timings } from "@/models/Service";
import { useAuth } from "@clerk/clerk-react";
import { createService, getService } from "@/services/services.service";
import { AxiosError } from "axios";

type Day = {
  id: string;
  name: string;
  fullday: string;
};

const days: Day[] = [
  { id: "Monday", name: "Lu", fullday: "Lunes" },
  { id: "Tuesday", name: "Ma", fullday: "Martes" },
  { id: "Wednesday", name: "Mi", fullday: "Miercoles" },
  { id: "Thursday", name: "Ju", fullday: "Jueves" },
  { id: "Friday", name: "Vi", fullday: "Viernes" },
  { id: "Saturday", name: "Sa", fullday: "Sabado" },
  { id: "Sunday", name: "Do", fullday: "Domingo" },
];

const types = [
  { id: "in-person", name: "Presencial" },
  { id: "online", name: "Online" },
  { id: "hybrid", name: "Hibrido" },
];

const ServicePage = () => {
  const { getToken } = useAuth();
  const [name, setName] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [timings, setTimings] = useState<{
    [key: string]: { start: string; end: string };
  }>({});
  const [type, setType] = useState("in-person");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [useTimeForAll, setUseTimeForAll] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const service = await getService(token);
        if (service) {
          setName(service.label);
          setLocation(service.location ?? "");
          setDuration(String(service.aviability.duration));
          setType(service.location === "Online" ? "online" : "in-person");
          const timings: { [key: string]: { start: string; end: string } } = {};
          service.aviability.timings.forEach((timing) => {
            timings[timing.day] = {
              start: `${timing.opening_hour}:${timing.opening_minute} ${timing.opening_AM_or_PM}`,
              end: `${timing.closing_hour}:${timing.closing_minute} ${timing.closing_AM_or_PM}`,
            };
          });
          setTimings(timings);
          setSelectedDays(
            service.aviability.timings.map((timing) => timing.day)
          );
        }
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.response?.data);
      }
    };
    fetchData();
  }, []);

  const isDaySelected = (id: string) => selectedDays.includes(id);

  const getDateText = useMemo(() => {
    let text = "";
    if (selectedDays.length === 0) return "Selecciona los dias";
    text = selectedDays
      .map((day) => {
        const dayString = days.find((d) => d.id === day)?.fullday;
        if (useTimeForAll) {
          return dayString;
        }

        if (Object.keys(timings).length === 0) return dayString;
        const timing = timings[day];
        return timing
          ? `${dayString} de ${timing.start} a ${timing.end}`
          : dayString;
      })
      .join(", ");

    if (useTimeForAll) {
      text += ` de ${timings["all"]?.start} a ${timings["all"]?.end}`;
    }

    return text;
  }, [selectedDays, timings]);

  const buildTimings = () => {
    let timingsArray: Timings[] = [];
    selectedDays.forEach((day) => {
      if (useTimeForAll) {
        timingsArray.push({
          day,
          opening_hour: timings["all"]?.start.split(":")[0] || "",
          opening_minute:
            timings["all"]?.start.split(":")[1].split(" ")[0] || "",
          opening_AM_or_PM: timings["all"]?.start.split(" ")[1] || "",
          closing_hour: timings["all"]?.end.split(":")[0] || "",
          closing_minute: timings["all"]?.end.split(":")[1].split(" ")[0] || "",
          closing_AM_or_PM: timings["all"]?.end.split(" ")[1] || "",
        });
        return;
      }

      const timing = timings[day];
      if (timing) {
        timingsArray.push({
          day,
          opening_hour: timing.start.split(":")[0],
          opening_minute: timing.start.split(":")[1].split(" ")[0],
          opening_AM_or_PM: timing.start.split(" ")[1],
          closing_hour: timing.end.split(":")[0],
          closing_minute: timing.end.split(":")[1].split(" ")[0],
          closing_AM_or_PM: timing.end.split(" ")[1],
        });
      }
    });

    return timingsArray;
  };

  const handleTimeChange = (day: string, start: string, end: string) => {
    setTimings((prev) => ({
      ...prev,
      [day]: { start, end },
    }));
  };

  const submitChanges = async () => {
    try {
      setLoading(true);
      let service: Service = {
        label: name.trim(),
        thumbnail: "",
        location: location.trim() === "" ? "Online" : location.trim(),
        aviability: {
          timezone: "America/Mexico_City",
          duration: Number(duration),
          breakBefore: 0,
          breakAfter: 0,
          max_appointments: 0,
          timings: buildTimings(),
        },
      };
      const token = await getToken();
      await createService(service, token);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={style.container}>
          <View style={style.headerContainer}>
            <Text style={[defaulStyles.semiboldFont]} variant="headlineLarge">
              Servicio
            </Text>
            <Text style={[defaulStyles.regularFont, { fontSize: 16 }]}>
              Aqui podras modificar los dias y el horario en el que te
              encuentras disponible
            </Text>
          </View>
          <View style={defaulStyles.inputContainer}>
            <Text style={defaulStyles.inputTitle}>Nombre del Servicio:</Text>
            <PrTextInput placeholder="" onChangeText={setName} value={name} />
          </View>
          <View style={[defaulStyles.inputContainer]}>
            <Text style={defaulStyles.inputTitle}>Formato:</Text>
            <SelectorComponent
              options={types}
              selected={type}
              setSelected={setType}
            />
          </View>
          <View style={[defaulStyles.inputContainer]}>
            <Text style={defaulStyles.inputTitle}>Lugar de Consulta:</Text>
            {type === "in-person" || type === "hybrid" ? (
              <PrTextInput
                placeholder=""
                value={location}
                onChangeText={setLocation}
              />
            ) : (
              <Text style={defaulStyles.regularFont}>Online</Text>
            )}
          </View>
          <View style={defaulStyles.inputContainer}>
            <Text style={defaulStyles.inputTitle}>Dias Disponibles:</Text>
            <View style={style.dayContainer}>
              {days.map((day, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    style.roundButton,
                    isDaySelected(day.id) && style.selectedButton,
                  ]}
                  onPress={() =>
                    setSelectedDays((prev) =>
                      prev.includes(day.id)
                        ? prev.filter((d) => d !== day.id)
                        : [...prev, day.id]
                    )
                  }
                >
                  <Text
                    style={[
                      defaulStyles.regularFont,
                      isDaySelected(day.id) && style.selectedText,
                    ]}
                  >
                    {day.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={defaulStyles.inputContainer}>
            <Text style={defaulStyles.inputTitle}>Horario Disponibles:</Text>
            {selectedDays.length > 0 && (
              <View>
                <Text style={defaulStyles.regularFont}>
                  Selecciona el horario para los dias seleccionados
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={defaulStyles.regularFont}>
                    Usar el mismo horario para todos los dias
                  </Text>
                  <Switch
                    value={useTimeForAll}
                    onValueChange={() => setUseTimeForAll(!useTimeForAll)}
                  />
                </View>
              </View>
            )}
            {useTimeForAll && (
              <TimeSelector
                startDate={timings["all"]?.start || "Selecciona el horario"}
                endDate={timings["all"]?.end || "Selecciona el horario"}
                setStartDate={(start) =>
                  handleTimeChange("all", start, timings["all"]?.end || "")
                }
                setEndDate={(end) =>
                  handleTimeChange("all", timings["all"]?.start || "", end)
                }
              />
            )}
            {!useTimeForAll &&
              selectedDays.map((day, i) => (
                <View key={i}>
                  <Text style={defaulStyles.regularFont}>
                    {days.find((d) => d.id === day)?.fullday}
                  </Text>
                  <TimeSelector
                    key={i}
                    startDate={timings[day]?.start || "Selecciona el horario"}
                    endDate={timings[day]?.end || "Selecciona el horario"}
                    setStartDate={(start) =>
                      handleTimeChange(day, start, timings[day]?.end || "")
                    }
                    setEndDate={(end) =>
                      handleTimeChange(day, timings[day]?.start || "", end)
                    }
                  />
                </View>
              ))}
          </View>
          <View style={[defaulStyles.inputContainer, { alignItems: "center" }]}>
            <Text style={defaulStyles.inputTitle}>Horario selecionado:</Text>
            <Text style={defaulStyles.regularFont}>{getDateText}</Text>
          </View>
          <View style={defaulStyles.inputContainer}>
            <Text style={defaulStyles.inputTitle}>
              Duracion de la sesion (min):
            </Text>
            <PrTextInput
              placeholder=""
              keyboardType="numeric"
              onChangeText={setDuration}
              value={duration}
            />
          </View>
          <View style={{ marginTop: 10, marginBottom: 10 }}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <TouchableOpacity
                style={[defaulStyles.btn]}
                onPress={() => submitChanges()}
              >
                <Text style={defaulStyles.btnText}>Guardar Cambios</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  dayContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    alignContent: "center",
    justifyContent: "center",
  },
  roundButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: Colors.dark.primary,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: Colors.dark.primary,
  },
  selectedText: {
    color: "black",
  },
});

export default ServicePage;
