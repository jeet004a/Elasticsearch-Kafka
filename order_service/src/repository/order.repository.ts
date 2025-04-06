import { eq } from "drizzle-orm"
import { DB } from "../db/db.connection"
import { orderLineItems, orders } from "../db/schema"
import { OrderWithLineItems } from "../dto/orderRequest.dto"


export type OrderRepositoryType={
    createOrder: (lineItems:OrderWithLineItems)=> Promise<Number>,
    findOrder:(id:number)=>Promise<OrderWithLineItems | null>,
    updateOrder:(id:number,status:string)=>Promise<OrderWithLineItems>,
    deleteOrder:(id:number)=>Promise<boolean>,
    findOrdersByCustomerId:(customerId:number)=>Promise<OrderWithLineItems[]>
}


const createOrder=async(lineItems: OrderWithLineItems):Promise<Number>=>{
    // console.log(lineItems)
    const result = await DB.insert(orders)
    .values({
      orderNumber: lineItems.orderNumber,
      customerId: lineItems.customerId,
      status: lineItems.status,
      txnId: lineItems.txnId,
      amount: lineItems.amount,
    })
    .returning();

  const [{ id }] = result;

  if (id > 0) {
    for (const item of lineItems.orderItems) {
      await DB.insert(orderLineItems)
        .values({
          orderId: Number(id),
          itemName: String(item.itemName),
          price: Number(item.price),
          qty: Number(item.qty),
        })
        .execute();
    }
  }

  return id
//   return 1
}


const findOrder=async(id: number): Promise<OrderWithLineItems | null>=>{
    const order=await DB.query.orders.findFirst({
        where:(orders,{eq})=>eq(orders.id,id),
        with:{
            lineItems:true
        }
    })

    if(!order){
        throw new Error("Order not found");
    }

    return order as unknown as OrderWithLineItems
}


const updateOrder=async(id: number, status: string):Promise<OrderWithLineItems>=>{
    await DB.update(orders).set({
        status:status
    }).where(eq(orders.id,id)).returning()

    const order=await findOrder(id)

    if(!order){
        throw new Error("Order not found");
        
    }
    return order
}

const deleteOrder=async(id:number):Promise<boolean>=>{
    await DB.delete(orders).where(eq(orders.id,id)).returning()
    return true
}


const findOrdersByCustomerId=async(customerId:number):Promise<OrderWithLineItems[]>=>{
    const order=await DB.query.orders.findMany({
        where:(orders,{eq})=>eq(orders.customerId,customerId),
        with:{
            lineItems:true
        }
    })

    // if(order.lenght<0){
    //     throw new Error("Order not found");
        
    // }
    return order as unknown as OrderWithLineItems[]
}

export const OrderRepository:OrderRepositoryType={
    createOrder,
    findOrder,
    updateOrder,
    deleteOrder,
    findOrdersByCustomerId
}