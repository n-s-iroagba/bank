import { Admin } from "./Admin";

export type SuperAdmin = {
    id:number,
    email: string;
    password:string;
    firstname:string;
    surname:string;
    username:string;
    admins:Admin[]
}

export type CreateSuperAdmin = {
    firstname:string;
    surname:string;
    email: string;
    password:string;
    username:string;
}