export type Bank ={
    id: number;
    name:string;
    logo:string;
    listerId:string;
}

export type CreateBank = Omit<Bank,'id'|'listerId'>
export type UpdateBank =  Omit<Bank,'id'>