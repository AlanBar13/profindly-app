import {
  useContext,
  useEffect,
  createContext,
  useState,
  PropsWithChildren,
} from "react";
import { Alert } from "react-native";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
//import { api } from "@/lib/apiClient";

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  signOut: () => void;
  signInWithEmail: (email: string, password: string) => void;
  signUpWithEmail: (
    email: string,
    password: string,
    name: string,
    lastname: string
  ) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const signOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setSession(null);
    setLoading(false);
  };

  const signInWithEmail = async (email: string, password: string) => {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.log(error.code);
      if (error.code === "invalid_credentials") {
        Alert.alert("Usuario o contraseña incorrectos");
      }
      setLoading(false);
      return;
    }

    setSession(session);
    setLoading(false);
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    name: string,
    lastname: string
  ) => {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { first_name: name, last_name: lastname } },
    });
    if (error) {
      console.log(error.code);
      switch (error.code) {
        case "user_already_exists":
          Alert.alert("El usuario ya existe");
          break;
        case "weak_password":
          Alert.alert("La contraseña debe tener al menos 6 caracteres");
          break;
        case "validation_failed":
          Alert.alert("El email no es válido");
          break;
        default:
          Alert.alert(`Error: ${error.message}`);
          break;
      }
      setLoading(false);
      return;
    }

    // if (session) {
    //   // Create user on DB
    //   await api.post(
    //     "/users",
    //     {
    //       name,
    //       lastname,
    //       email,
    //       login_type: "email",
    //       auth_id: session.user.id,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${session.access_token}`,
    //       },
    //     }
    //   );
    // }

    setSession(session);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{ session, loading, signOut, signInWithEmail, signUpWithEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth has to be used within <AuthProvider>");
  }
  return authContext;
};
