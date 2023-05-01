import Aula from "./Aula";
import SupleMaterial from "./SuplementarMaterial";


export default interface Module {
    id?: number;
    UIDCurse?: string;
    title?: string;
    description?: string;
    videoUrl?: string; // URL do vídeo da lição
    duration?: number; // Duração do vídeo em minutos
    supplementaryMaterial?: SupleMaterial[]; // Lista de URLs ou nomes dos materiais de apoio (opcional)
    displayOrder?: number; // Ordem de exibição das lições no módulo
    moduleId?: number; // Referência ao ID do módulo ao qual a lição pertence
    createdAt?: Date;
    updatedAt?: Date;
    completed?: boolean;
    aulas: Aula[];

}
