import Module from "./Module";

export default interface Course {
    id?: string;
    title?: string;
    description?: string;
    category?: string;
    duration?: number;
    coverImage?: string; // URL da imagem de capa
    instructorId?: number | string; // Referência ao ID do instrutor (User) responsável pelo curso
    instructor?: {
      id?: number;
      name?: string;
      email?: string;
      avatarUrl?: string;
      expertise: string;
    };
    lastModule?: string;
    lastClass?: string;
    price?: number;
    createdAt?: Date;
    status?: "active" | "inactive" | "in-development";
    requirements?: string[]; // Lista de requisitos (opcional)
    completed?: boolean; // Indica se o curso foi concluído
    Module?: Module[]; ///Adicionar aos 
  }