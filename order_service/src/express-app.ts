import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import cartRoutes from './routes/cart.routes';
import orderRoutes from './routes/order.routes';

// import catalogRouter from './api/catalog.routes'

// const PORT = process.env.PORT || 8000;

// const myMiddlewareFunction = (_req: Request, _res: Response, next: NextFunction) => {
//     console.log("Middleware executed");
//     next();
// };

const app = express();
app.use(cors());
app.use(express.json());
// app.use(myMiddlewareFunction);

app.use(cartRoutes)
app.use(orderRoutes)

app.use("/", (_req: Request, res: Response) => {    
    return res.status(200).json({ message: "I am healthy!" });
});


// app.listen(PORT, () => {
//     console.log("Listening us tot: ", PORT);
// })

export default app;