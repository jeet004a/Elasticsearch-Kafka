import { Consumer, Kafka, logLevel, Partitioners, Producer } from "kafkajs";
import { MessageBrokerType, MessageHandler, PublishType } from "./broker.types";
import { MessageType, CatalogEvent, TOPIC_TYPE } from "../../types";


const CLIENT_ID=process.env.CLIENT_ID|| "catalog_servcie"
const GROUP_ID=process.env.GROUP_ID || 'catalog-service-group'
const BROKER=[process.env.BROKER_1||'localhost:9092']

const kafka=new Kafka({
    clientId: CLIENT_ID,
    brokers: BROKER,
    logLevel: logLevel.INFO
})

let producer: Producer
let consumer: Consumer


const createTopic=async(topic:string[])=>{
    const topics=topic.map((t)=>(
        {
            topic: t,
            numPartitions: 2,
            replicationFactor: 1
        }))

        const admin=kafka.admin()

        await admin.connect()
        const topicExists=await admin.listTopics()
        console.log('topicExists',topicExists)
        for(const t of topics){
            if(!topicExists.includes(t.topic)){
                await admin.createTopics({
                    topics: [t]
                })
            }
        }

        await admin.disconnect()
}



const connectProducer=async<T>():Promise<T>=>{
    await createTopic(["CatalogEvents"])

    if(producer){
        console.log("producer already connected with existing connection")
        return producer as unknown as T
    }

    producer=kafka.producer({
        createPartitioner: Partitioners.DefaultPartitioner
    })

    await producer.connect()
    console.log('producer connected with a new connection')

    return producer as unknown as T

}


const disconnectProducer=async():Promise<void>=>{
    if(producer){
        await producer.disconnect()
    }
}


const publish=async(data: PublishType):Promise<Boolean>=>{
    const producer=await connectProducer<Producer>();
    const result=await producer.send({
        topic: data.topic,
        messages:[
            {
                headers: data.headers,
                key: data.event,
                value: JSON.stringify(data.message)
            }
        ]
    })
    console.log('Publishing result',result)
    return result.length>0
}


const connectConsumer=async<T>():Promise<T>=>{
    if(consumer){
        return consumer as unknown as T
    }

    consumer=kafka.consumer({
        groupId: GROUP_ID
    })

    await consumer.connect()
    return consumer as unknown as T
}


const disconnectConsumer=async():Promise<void>=>{
    if(consumer){
        await consumer.disconnect()
    }
}


const subscribe=async(messageHandler:MessageHandler,topic:TOPIC_TYPE):Promise<void>=>{
    const consumer =await connectConsumer<Consumer>();
    await consumer.subscribe({topic: topic,fromBeginning:true})

    await consumer.run({
        eachMessage: async({topic,partition, message})=>{
            if(!["CatalogEvents"].includes(topic)){
                return
            }

            if(message.key&&message.value){
                const inputMessage:MessageType={
                    headers: message.headers,
                    event: message.key.toString() as CatalogEvent,
                    data: message.value? JSON.parse(message.value.toString()) : null
                }

                await messageHandler(inputMessage)
                await consumer.commitOffsets([
                    {topic, partition, offset: (Number(message.offset)+1).toString()}
                ])
            }
        }
    })
}



export const MessageBroker:MessageBrokerType={
    connectProducer,
    disconnectProducer,
    publish,
    connectConsumer,
    disconnectConsumer,
    subscribe
}