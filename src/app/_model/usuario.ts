import { Rol } from "./rol";

export class Usuario {
    idUsuario: number;
    username: string;
    password: string;
    enabled: boolean;
    roles: Rol[];
    }
