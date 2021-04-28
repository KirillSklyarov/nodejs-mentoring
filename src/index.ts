import express, {} from 'express';
import { userRouter } from './routes/user';
import { joiErrorHandler } from './middlewares/joi-error-handler';
import { appErrorHandler } from './middlewares/app-error-handler';

const app = express();
const PORT = process.env.PORT || 8000;

app.use('/user', userRouter);
app.use(joiErrorHandler);
app.use(appErrorHandler);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
