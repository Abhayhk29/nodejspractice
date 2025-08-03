import express, {Express} from "express";
import catalogRouter from './api/catalog.routes'
import {  httpLogger, HandleErrorWithLogger } from "./utils";
import { ElasticSearchService } from "./services/elasticsearch.service";
import { AppEventListener } from "./utils/AppEventListener";


// const PORT = process.env.PORT || 8000;

const app : Express = express();
app.use(express.json());
app.use(httpLogger);

const elasticSearchInstance = new ElasticSearchService();
AppEventListener.instance.listen(elasticSearchInstance);

app.use("/", catalogRouter)

app.use(HandleErrorWithLogger);

// app.listen(PORT, () => {
//     console.log("Listening us tot: ", PORT);
// })

export default app;