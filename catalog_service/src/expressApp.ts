import express, {Express} from "express";
import catalogRouter from './api/catalog.routes'
import {  httpLogger, HandleErrorWithLogger } from "./utils";


// const PORT = process.env.PORT || 8000;

const app : Express = express();
app.use(express.json());
app.use(httpLogger);

app.use("/", catalogRouter)

app.use(HandleErrorWithLogger);

// app.listen(PORT, () => {
//     console.log("Listening us tot: ", PORT);
// })

export default app;