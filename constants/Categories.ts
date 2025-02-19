import { MaterialIcons } from "@expo/vector-icons";

interface Categories {
  id: string;
  name: string;

  icon: keyof typeof MaterialIcons.glyphMap;
}

export const categories: Categories[] = [
  { id: "none", name: "Inicio", icon: "home" },
  { id: "medicine", name: "Medicina", icon: "medical-services" },
  { id: "mental-health", name: "Salud Mental", icon: "psychology" },
  { id: "physical-health", name: "Salud Física", icon: "accessibility" },
  { id: "nutrition", name: "Nutrición", icon: "food-bank" },
  { id: "ophthalmology", name: "Oftalmología", icon: "remove-red-eye" },
  { id: "vet", name: "Veterinaria", icon: "pets" },
  { id: "nursing", name: "Enfermería", icon: "health-and-safety" },
  { id: "dentistry", name: "Odontología", icon: "mood" },
];
