// DDD Domain driven design
// ubiquitous Language : all can call this
// not tightly coupled

import expressApp from './express-app';
import { logger } from './utils';

export const StartServer = async() => {
    const PORT = process.env.PORT || 9000;

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
