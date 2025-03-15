import { Type,Static } from "@sinclair/typebox";
// import { type } from "os";

export const CartRequestScehma=Type.Object({
    productId: Type.Integer(),
    customerId: Type.Integer(),
    qty: Type.Integer()
})

export type CartRequestInput=Static<typeof CartRequestScehma>


export const CartEditRequestSchema=Type.Object({
    id: Type.Integer(),
    qty: Type.Integer()
})

export type CartEditRequestInput=Static<typeof CartEditRequestSchema>