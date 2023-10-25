
export namespace NSUser {
  export enum UserType {
    seller = "seller",
    buyer = "buyer",
    admin = "admin"
  }

  export enum AccountType{
    current='current', 
    saving= 'saving'
  }

  export interface SingleUser {
    id: string;
    userName: string;
    email: string;
    password: string;
    country: string,
    type: NSUser.UserType,
    phoneNumber: string
    createdAt: Date;
    roles: string[]
    orders: string[]
    cart?: string //it will be id for single cart 
    paymentInfo?: string  //it will be id for single paymentInfo

    //This is for buyer type to add payment info 
    nameForReceipt? : string 
    city?: string 
    fullAddress?: string 

    //this is for seller type to create seller profile 
    identityNumber?: number
    nickName?: string
    shopName?: string
    accountNumber?: number
    accountType?: AccountType
    shippingLocation?: string
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