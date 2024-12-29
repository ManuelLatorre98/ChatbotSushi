import { mongodbInit } from './config/mongodbInit';
import * as dotenv from 'dotenv';
import app from './app';
import cors from 'cors';

dotenv.config()
//DB and server initialization
mongodbInit()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server running on port ${port}...`));
  })
  .catch(err => console.error(err));
