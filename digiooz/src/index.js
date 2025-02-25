// Express app setup
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { connectDatabase }  from './database/index.js';
import userRouter from './routes/userRoutes.js'
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors'
const app = express();
dotenv.config();

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Digiooz!');
});

//Error middleware
app.use(errorMiddleware);

//cors
app.use(cors());

app.use("/api",userRouter)

//start the server
async function startServer() {

    //connect database
    await connectDatabase();
    app.listen(process.env.PORT, () => {
        console.log(`server started running on port::[${process.env.PORT}] ✅`);
    })
}

startServer();
