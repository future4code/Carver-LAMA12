export type user = {
    id: string,
    name: string,
    email: string,
    password: string
    role: User_TYPES
 }

 export enum User_TYPES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
 }