import expressApp from './expressApp';
import { logger } from './utils';
const PORT=process.env.PORT || 3000


export const StartServer = async () => {
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