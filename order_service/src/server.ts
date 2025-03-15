import { ExpressApp } from './express-app';
const PORT=process.env.PORT || 4000
import { logger } from './utils';

export const StartServer = async () => {
    const expressApp=await ExpressApp()
    expressApp.listen(PORT, () => {
        logger.info(`Server is running on port at ${PORT}`);
    });


    process.on('uncaughtException',(err)=>{
        logger.error('errpr',err)
        process.exit(1)
    })

}

StartServer().then(()=>{
    logger.info('Server is up')
})