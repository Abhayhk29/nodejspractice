import express, { NextFunction, Request, Response } from 'express';
import { MessageBroker } from '../utils/broker/message-broker';
import { OrderEvent } from '../types';
import { RequestAuthorizer } from './middleware';
import * as service from '../service/order.service';
import { OrderRepository } from '../repository/order.repository';
import { CartRepository } from '../repository/cart.repository';

const repo = OrderRepository
const CartRepo = CartRepository;
const router = express.Router();

// router.post('/order', async (_req: Request, res: Response) => {
//     return res.status(200).json({ message: "create order" })
// })

router.post(
    "/orders",
    RequestAuthorizer,
    async (req: Request, res: Response, next: NextFunction) => {
        // order creation logic
        console.log("ortder created:--------------------")
        // 3rd step : publish the message
        // await MessageBroker.publish({
        //     'topic':"OrderEvents",
        //     headers: {token : req.headers.authorization},
        //     event: OrderEvent.CREATE_ORDER,
        //     message:{
        //         orderId:1,
        //         item:[
        //             {
        //                 productId :1,
        //                 quantity:1
        //             },{
        //                 productId:2,
        //                 quantity:2
        //             }
        //         ]
        //     }
        // });
        const user = req.user;
        if(!user){
            next( new Error("User not found"));
            return;
        }
        const response = await service.CreateOrder(user.id, repo, CartRepo);
        return res.status(200).json(response)
        // return res.status(200).json({ message: "create order" })
    }
);

router.get(
    "/orders",
    RequestAuthorizer,
    async (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;
        if(!user){
            next( new Error("User not found"));
            return;
        }
        const response = await service.GetOrders(user.id, repo);
        return res.status(200).json(response)
        // return res.status(200).json({ message: "create order" })
    }
);

router.get(
    "/order/:id",
    RequestAuthorizer,
    async (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;
        if(!user){
            next( new Error("User not found"));
            return;
        }
        const response = await service.GetOrder(user.id, repo);
        return res.status(200).json(response)
        // return res.status(200).json({ message: "create order" })
    }
);

// only to call from the microservices
router.patch(
    "/orders/:id",
    RequestAuthorizer,
    async (req: Request, res: Response, next: NextFunction) => {
        // security check for the microservice calls only
        // const user = req.user;
        // if(!user){
        //     next( new Error("User not found"));
        //     return;
        // }
        const orderId = parseInt(req.params.id);
        const status = req.body.status
        const response = await service.UpdateOrder(orderId, status, repo);
        return res.status(200).json(response)
        // return res.status(200).json({ message: "create order" })
    }
);

router.delete(
    "/order/:id",
    RequestAuthorizer,
    async (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;
          if(!user){
            next( new Error("User not found"));
            return;
        }
        const orderId = parseInt(req.params.id);
        const response = await service.DeleteOrder(orderId, repo);
        return res.status(200).json(response)
        // return res.status(200).json({ message: "create order" })
    }
);

export default router;