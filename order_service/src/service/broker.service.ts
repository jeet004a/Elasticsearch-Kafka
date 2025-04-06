import { Consumer, Producer } from "kafkajs"
import { MessageBroker } from "../utils/broker"
import { HandleSubsrciption } from "./order.service"
import { OrderEvent } from "../types"

export const InitiallizeBroker=async()=>{

    //Initialize the  broker and consumer
    const producer=await MessageBroker.connectProducer<Producer>()
    producer.on('producer.connect',()=>{
        console.log("Order service Producer connected sucessfully")
    })


    const consumer=await MessageBroker.connectConsumer<Consumer>()

    consumer.on("consumer.connect",()=>{
        console.log("Order Service Consumer connected sucessfully")
    })


    //Keep listining the consumer events 
    //Perform the action based on events
    await MessageBroker.subscribe(HandleSubsrciption,"OrderEvents")
}


//Publish Dedicated events based on use Cases
export const SendCreateOrderMessage=async(data:any)=>{
    await MessageBroker.publish({
        event:OrderEvent.CREATE_ORDER,
        topic: "CatalogEvents",
        headers:{},
        message:data
    })
}


export const SendOrderCancel=async(data:any)=>{
    await MessageBroker.publish({
        event:OrderEvent.CANCEL_ORDER,
        topic:"CatalogEvents",
        headers:{},
        message:data
    })
}