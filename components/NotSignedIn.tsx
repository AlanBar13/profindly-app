import { defaulStyles } from "@/constants/Styles";
import { Link } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

interface Props {
    title: string
}

const NotSignedIn = ({ title }: Props) => {
  return (
    <View>
      <Text
        style={{ fontFamily: "mn-sb", marginBottom: 12 }}
        variant="headlineLarge"
      >
        {title}
      </Text>
      <Text
        style={{ fontFamily: "mn-r", marginBottom: 12 }}
        variant="bodyLarge"
      >
        Si quieres tener acceso a esta funcionalidad, registrate o inicia sesion
        dando click en el siguiente boton:
      </Text>
      <Link href="/(modals)/login" asChild>
        <TouchableOpacity style={defaulStyles.btn}>
          <Text style={defaulStyles.btnText}>Iniciar Sesion</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default NotSignedIn;
