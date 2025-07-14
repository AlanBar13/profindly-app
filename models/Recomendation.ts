export type RecomendationRequest = {
  age: number;
  syntoms: string;
  budget: [number, number];
  location?: string;
  languages?: string[];
};

export type AISpecialist = {
  especialidad: string, 
  especialista: string, 
  presupuesto: string, 
  subespecialidades: string, 
  ubicacion: string
  id: string
}

export type RecomendationResponse = {
  specialists: AISpecialist[];
}