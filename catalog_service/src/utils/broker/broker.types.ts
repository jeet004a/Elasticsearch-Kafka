import { MessageType, CatalogEvent, TOPIC_TYPE } from "../../types";

export interface PublishType{
    headers:Record<string,any>;
    topic: TOPIC_TYPE;
    event: CatalogEvent;
    message: Record<string,any>
}


export type MessageHandler=(input :MessageType)=>void

export type MessageBrokerType={
    //Producer
    connectProducer:<T>()=> Promise<T>;
    disconnectProducer:<T>()=>Promise<void>;
    publish:(data:PublishType)=>Promise<Boolean>;

    //consumer
    connectConsumer:<T>()=>Promise<T>;
    disconnectConsumer:<T>()=>Promise<void>;
    subscribe:(messageHandler:MessageHandler,topic:TOPIC_TYPE)=>Promise<void>
}