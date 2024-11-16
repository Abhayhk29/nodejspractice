import express, {Express} from "express";
import catalogRouter from './api/catalog.routes'

// const PORT = process.env.PORT || 8000;

const app : Express = express();
app.use(express.json());

app.use("/", catalogRouter)


// app.listen(PORT, () => {
//     console.log("Listening us tot: ", PORT);
// })

export default app;