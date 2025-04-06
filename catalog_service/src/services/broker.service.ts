import { Consumer, Producer } from "kafkajs";
import { CatalogService } from "./catalog.service";
import { MessageBroker } from "../utils/broker";

export class BrokerService{
    private consumer: Consumer | null=null
    private producer: Producer | null=null

    private catalogService: CatalogService

    constructor(catalogService:CatalogService){
        this.catalogService=catalogService
    }


    public async initializeBroker(){
        this.producer=await MessageBroker.connectProducer<Producer>()
        this.producer.on('producer.connect',()=>{
            console.log("Catalog service Producer connected sucessfully")
        })


        this.consumer=await MessageBroker.connectConsumer<Consumer>()

        this.consumer.on("consumer.connect",()=>{
            console.log("Catalog service Consumer connected sucessfully")
        })

        await MessageBroker.subscribe(this.catalogService.handleBrokerMessage.bind(this.catalogService),"CatalogEvents")
    }

    //Publish discontinue product event
    public async sendDeleteProductMessage(data:any){}
}