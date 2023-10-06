
export namespace NSUser {
  export enum Type {
    seller = 'seller',
    buyer = 'buyer',
    admin = 'admin',
  }

  export interface Item {
    id: string;
    fullName: string;
    email: string;
    password: string;
    description?: string;
    type: Type;
    createdAt: Date;
  }

  export interface Role {
    id: number;
    name: string;
    permissions: number[];
  }
  
  export interface Permission {
    id: number;
    name: string;
  }
}