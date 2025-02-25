 import mongoose from 'mongoose';
 
export async function connectDatabase() {
    console.log("connecting database ...");
    await connectDb()
    .then(() => console.log(`connected to database ✅`))
    .catch(async () => {
        console.log("reconnecting database .....");
        await connectDb()
        .then(() => console.log(`connected to database ✅`))
        .catch((e) => {
            console.log(e);
            process.exit(1);
        })
    })
}

async function connectDb() {
    return mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        keepAlive: true
    });
}

