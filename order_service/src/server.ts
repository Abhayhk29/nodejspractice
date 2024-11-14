// DDD Domain driven design
// ubiquitous Language : all can call this
// not tightly coupled

import express from 'express';
import expressApp from './express-app';

export const StartServer = async() => {
    const PORT = process.env.PORT || 9000;

    expressApp.listen(PORT, () => {
        console.log( `App is listening to ${PORT}`);
    })
    // aaccessing unhandled error
    process.on('uncaughtException', async(err) => {
        console.log(err);
        process.exit(1);
    })
}

StartServer().then(() => {
    console.log("Server is up")
})
