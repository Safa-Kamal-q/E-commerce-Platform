
export namespace NSUser {
  export enum UserType {
    seller = 'seller',
    buyer = 'buyer',
    admin = 'admin',
    guest = 'guest'
  }

  export interface SingleUser {
    id: string;
    userName: string;
    email: string;
    password: string;
    country: string,
    type: UserType,
    createdAt: Date;
    roles: string[]
    orders: string[]
    cart?: string //it will be id for single cart 
    paymentInfo?: string  //it will be id for single paymentInfo

    fullBuyerName : string 
    phoneNumber: number 
    city: string 
    fullAddress: string 
  }

  export interface Role {
    id: string;
    name: UserType;
    permissions: number [];
  }

  export interface Permission {
    id: number;
    name: string;
  }

}