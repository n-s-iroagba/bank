import { Admin } from "./Admin";

export type SuperAdmin = {
    id:number,
    username: string;
    email: string;
    password:string;
    admins:Admin[]
}

export type CreateSuperAdmin = {
    username: string;
    email: string;
    password:string;
}