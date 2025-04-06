// import { OrderWithLineItems } from "../dto/orderRequest.dto";
import { InProcessOrder, OrderLineItemType, OrderWithLineItems } from "../dto/orderRequest.dto";
import { CartRepositoryType } from "../repository/cart.respository";
import { OrderRepositoryType } from "../repository/order.repository";
import { MessageType, OrderStatus } from "../types";
import { SendCreateOrderMessage } from "./broker.service";

export const CreateOrder=async(
    userId:number,
    repo:OrderRepositoryType,
    cartRepo:CartRepositoryType
)=>{
    const cart=await cartRepo.findCart(userId)
    if(!cart){
        throw new Error("Cart Not found");
    }
    let cartTotal=0
    let orderLineItems:OrderLineItemType[]=[]
    cart.lineItems.forEach((item) => {
        cartTotal += item.qty * Number(item.price);
        orderLineItems.push({
          productId: item.productId,
          itemName: item.itemName,
          qty: item.qty,
          price: item.price,
        } as unknown as OrderLineItemType);
      });
    const orderNumber=Math.floor(Math.random()*1000)
    const orderInput: OrderWithLineItems={
        orderNumber: orderNumber,
        txnId: null,
        status: "PENDING",
        customerId:userId,
        amount:cartTotal.toString(),
        orderItems:orderLineItems
    }

    const order=await repo.createOrder(orderInput)
    await cartRepo.clearCartData(userId)
    // console.log("Order Created",order)


    //fire the message to subscription service [catalog Service] to update the stock 
    await SendCreateOrderMessage(orderInput)
    return {message: "Order Created successfully ",orderNumber:orderNumber}
}

export const UpdateOrder=async(
    orderId:number,
    status:OrderStatus,
    repo:OrderRepositoryType,
    // cartRepo:CartRepositoryType
)=>{
    await repo.updateOrder(orderId,status)

    //If order is cancelled later on the update the stock and what ever amount of stock is order
    if(status==OrderStatus.CANCELLED){
        // await repo.publishOrderEvent(order,"ORDER_CANCELLED")
    }

    return {message:"Order Upddated sucessfully"}
}


export const GetOrder=async(
    orderId:number,
    repo:OrderRepositoryType,
)=>{

    const order=await repo.findOrder(orderId)

    if(!order){
        throw new Error("Order not found");
        
    }
    return order
}

export const GetOrders=async(
    userId:number,
    repo:OrderRepositoryType,
)=>{
    const orders=await repo.findOrdersByCustomerId(userId)
    if(Array.isArray(orders) && orders.length>0){
        return orders
    }
    throw new Error("Orders not found");
}


export const DeleteOrder=async(
    orderId:number,
    repo:OrderRepositoryType,
)=>{
    await repo.deleteOrder(orderId)
    return true
}


export const HandleSubsrciption=async(message:MessageType)=>{
    console.log('Message received by order Kafka consumer',message)
}


export const CheckoutOrder=async(orderId:number,repo:OrderRepositoryType)=>{
    const order=await repo.findOrder(orderId)
    if(!order){
        throw new Error("Order not found ");
        
    }

    const checkoutOrder:InProcessOrder={
        id:order.id,
        orderNumber:order.orderNumber,
        status:order.status,
        customerId:order.customerId,
        amount:Number(order.amount),
        createdAt:order.createdAt,
        updatedAt:order.updatedAt
    }
}