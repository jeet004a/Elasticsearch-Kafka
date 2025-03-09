import expressApp from './express-app';
const PORT=process.env.PORT || 4000

export const StartServer = async () => {
    expressApp.listen(PORT, () => {
        console.log('Server is running on port',PORT);
    });


    process.on('uncaughtException',(err)=>{
        console.log('errpr',err)
        process.exit(1)
    })

}

StartServer().then(()=>{
    console.log('Server is up')
})