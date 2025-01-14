import { Admin } from "./Admin";

export type SuperAdmin = {
    id:number,
    email: string;
    password:string;
    firstName:string;
    surname:string;
    username:string;
    admins:Admin[]
}

export type CreateSuperAdmin = {
    firstName:string;
    surname:string;
    email: string;
    password:string;
    username:string;
}