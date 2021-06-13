import { User } from "./user";

export interface Commande {
    client: User,
    articles: [{
        idArticle: number,
        quantite: number
    }]
}
