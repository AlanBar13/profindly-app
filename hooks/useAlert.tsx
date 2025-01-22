import {
  useContext,
  createContext,
  useState,
  PropsWithChildren,
} from "react";
import { Snackbar, Text } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";

interface AlertContextType {
  showAlert: (textToDisplay: string) => void;
  displayAlert: () => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | null>(null);

const AlertProvider = ({ children }: PropsWithChildren) => {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");

  const showAlert = (textToDisplay: string) => {
    setText(textToDisplay);
    displayAlert();
  };

  const displayAlert = () => setVisible(true);
  const hideAlert = () => setVisible(false);

  return (
    <AlertContext.Provider value={{ showAlert, displayAlert, hideAlert }}>
      {children}
      <Snackbar
        visible={visible}
        onDismiss={hideAlert}
        action={{
          label: "CERRAR",
          onPress: () => hideAlert(),
        }}
      >
        {text}
      </Snackbar>
    </AlertContext.Provider>
  );
};

export default AlertProvider

export const useAlert = () => {
    const alertContext = useContext(AlertContext);
    if (!alertContext) {
        throw new Error("useAlert has to be used within <AlertProvider>")
    }
    return alertContext;
}
