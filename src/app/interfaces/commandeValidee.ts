import { Adresse } from "./adresse";
import { Articles } from "./articles";
import { User } from "./user";

export interface CommandeValidee {
  numCommande?: number;
  dateCommande?: string;
  user? : User
  adresse?: Adresse;
  articles?: Articles[];
}
