import 'dotenv/config';
import express, { urlencoded } from 'express';
import userRouter from './routes/user.route.js'
import visitorRouter from './routes/visitor.route.js'
import cors from "cors"

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users', userRouter)
app.use('/api/v1/visitor', visitorRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Servidor corriendo en puerto: ' + PORT))
