// DDD Domain driven design
// ubiquitous Language : all can call this
// not tightly coupled

import { ExpressApp } from "./express-app";

import { logger } from './utils';

const PORT = process.env.PORT || 9000;

export const StartServer = async() => {
    const expressApp = await ExpressApp();

    expressApp.listen(PORT, () => {
        logger.info( `App is listening to ${PORT}`);
    })
    // aaccessing unhandled error
    process.on('uncaughtException', async(err) => {
        logger.error(err);
        process.exit(1);
    })
}

StartServer().then(() => {
    logger.info("Server is up")
})
