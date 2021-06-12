import { Adresse } from "./adresse";

export interface User {
    id?: number;
    nom?: string;
    prenom?: string;
    email?: string;
    motDePasse?: string;
    adresse?: Adresse;
    idadmin?: number;
}
