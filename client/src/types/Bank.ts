export type Bank ={
    id: number;
    name:string;
    logo:string;
}

export type CreateBank = Omit<Bank,'id'>
export type EditBank =  Omit<Bank,'id'>