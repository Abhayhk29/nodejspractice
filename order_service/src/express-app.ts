import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import cartRoutes from './routes/cart.routes';
import orderRoutes from './routes/order.routes';
import { httpLogger, HandleErrorWithLogger } from "./utils";
import { MessageBroker } from "./utils/broker/message-broker";
import { Consumer, Producer } from "kafkajs";
import { InitializeBroker } from "./service/broker.service";

// import catalogRouter from './api/catalog.routes'

// const PORT = process.env.PORT || 8000;

// const myMiddlewareFunction = (_req: Request, _res: Response, next: NextFunction) => {
//     console.log("Middleware executed");
//     next();
// };

export const ExpressApp = async () => {
    const app = express();
app.use(cors());
app.use(express.json());
app.use(httpLogger);
// app.use(myMiddlewareFunction);

await InitializeBroker();

// /first step connect to the producer and consumer
// const producer = await MessageBroker.connectProducer<Producer>();
// producer.on("producer.connect", () => {
//     console.log("Producer connected")
// })

// const consumer = await MessageBroker.connectConsumer<Consumer>();
// consumer.on("consumer.connect",() => {
//     console.log("consumer connected");
// })

// // subscribe to the tope or publish the message

// // subscribe the topic
// await MessageBroker.subscribe((message) => {
//     console.log("message recieved")
//     console.log("message recieved",message)
// },'OrderEvents')

app.use(cartRoutes)
app.use(orderRoutes)

app.use("/", (_req: Request, res: Response) => {    
    return res.status(200).json({ message: "I am healthy!" });
});


// app.listen(PORT, () => {
//     console.log("Listening us tot: ", PORT);
// })
app.use(HandleErrorWithLogger);

return app;
}
