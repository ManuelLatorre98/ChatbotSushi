import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';
import cors from "cors";

const app = express();
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:4000'
}))

app.use('/api', routes);

export default app
