import { User } from "./user";

export interface Commande {
    user: User,
    products: [{
        id: number,
        quantite: number
    }]
}
