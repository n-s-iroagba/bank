import { AccountHolder } from "./AccountHolder";

export type BaseAdmin = {
    id:number,
    email:string;
    username: string;
    password: string;
};

export type Admin = BaseAdmin & {
    id: number;
    accountHolders?: AccountHolder[];
};

export type CreateAdmin = Omit<BaseAdmin,'id'>;

export type EditAdmin = Omit<BaseAdmin,'id'>;