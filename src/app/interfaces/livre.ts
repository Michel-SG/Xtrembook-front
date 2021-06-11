import { Articles } from "./articles";
import { Auteur } from "./auteur";

export interface Livre extends Articles {
    isbn13?: string,
    formatLivre?: string,
    genre?: string,
    nomEditeur?: string,
    auteurs?: Auteur[]
}
