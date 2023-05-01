import SupleMaterial from "./SuplementarMaterial";



export default interface Aula{
    id?: string;
    nome?: string;
    descricao?: string;
    duracao?: number;
    urlAula?: string;
    suplementar?: SupleMaterial[];
    completed?: boolean;
}