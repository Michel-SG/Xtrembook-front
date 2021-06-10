import { Articles } from "./articles";

export interface Livre extends Articles {
    isbn13?: string,
    formatLivre?: string,
    genre?: string,
    nomEditeur?: string,
    nom?: string,
    prenom?: string
}
