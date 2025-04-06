import {  Producer } from "kafkajs"
import { MessageBroker } from "../utils/broker"
// import { HandleSubsrciption } from "./order.service"
import { PaymentEvent } from "../types"

export const InitiallizeBroker=async()=>{

    //Initialize the  broker and consumer
    const producer=await MessageBroker.connectProducer<Producer>()
    producer.on('producer.connect',()=>{
        console.log("Order service Producer connected sucessfully")
    })

}


//Publish Dedicated events based on use Cases
export const SendPaymentUpdateMessage=async(data:any)=>{
    await MessageBroker.publish({
        event:PaymentEvent.UPDATE_PAYMENT,
        topic: "OrderEvents",
        headers:{},
        message:{
            data
        }
    })
}
