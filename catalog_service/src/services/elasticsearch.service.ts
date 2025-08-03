import { CatalogProduct } from '../dto/payload.dto';
import {EventPayload} from '../utils/AppEventListener'
import { Client } from "@elastic/elasticsearch"

export class ElasticSearchService {
    private indexName = "product";
    private client: Client

    constructor(){
        this.client = new Client({
            node: process.env.ELASTICSEARCH_URL || "http://localhost:9200"
        })
    }

    async handleEvents({event, data}: EventPayload){
        console.log("Eventsearch service : HandlerEvents", event, data);
        switch (event) {
            case "CreateProduct":
                console.log("Create product event recieved in Elastic Search")
                await this.createProduct(data as CatalogProduct)
                return;
            case "updateProduct":
                console.log("update product event recieved in Elastic Search")
                await this.updateProduct(data as CatalogProduct)
                return;
            case "deleteProduct":
                console.log("delete product event recieved in Elastic Search")
                const { id } = data as { id: string };
                await this.deleteProduct(id)
                return;
            default:
                break;
        }
    }

    async createIndex(){
        
        const indexExists = await this.client.indices.exists({index: this.indexName})
        if(!indexExists){
            await this.client.indices.create({
                index: this.indexName,
                mappings: {
                    properties: {
                        id: { type: "keyword" },
                        title: { type: "text" },
                        description: { type: "text" },
                        price: { type: "float" },
                        stock: { type: "integer" },
                    }
                }
            })
        }
    }

    async getProducts(id: string){
        const result = await this.client.get({
            index : this.indexName,
            id : id.toString()
        })

        return result._source;
    }

    async createProduct(data: CatalogProduct){
        await this.client.index({
            index: this.indexName,
            id: data.id.toString(),
            document: data
        })
        console.log("product created with id", data.id);
    }

    async updateProduct(data: CatalogProduct){
        await this.client.update({
            index: this.indexName,
            id: data.id.toString(),
            doc: data
        })
    }

    async deleteProduct(id:string){
        await this.client.delete({
            index: this.indexName,
            id
        })
        console.log("Product deleted with the ID", id)
    }

    async searchProduct(query:string){
        const result = this.client.search({
            index: this.indexName,
            query:{
                multi_match:{
                    query,
                    fields:["title", "description"],
                    fuzziness: "AUTO"
                }
            }
        })
        return (await result).hits.hits.map((hit) => hit._source)
    }
}