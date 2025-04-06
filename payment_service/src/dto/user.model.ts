export interface User{
    id:number;
    email:string;
    iat:number;
    exp:number
}

declare global{
    namespace Express{
        interface Request{
            user?:User
        }
    }
}