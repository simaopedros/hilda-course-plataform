import Course from "./Course";

export  default interface User {
    id?: number;
    UID?: string;
    name?: string;
    email?: string;
    password?: string; // Armazenar a versão criptografada da senha
    userType?: "student" | "instructor" | "admin";
    profilePicture?: string; // URL da imagem de perfil (opcional)
    description?: string; // Descrição ou biografia do usuário (opcional)
    createdAt?: Date;
    updatedAt?: Date;
    courses?: Course[];
    plan?: {
      productId: number,
      productName: string,
      purchaseDate: number,
      status: string,
      transaction: string
    }
  }