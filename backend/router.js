import express from 'express';
import authRoute from './routes/authRoute.js'
import tweetsRoute from './routes/tweetsRoute.js'
const router = express.Router();

router.use('/auth', authRoute );
router.use('/tweets', tweetsRoute);

export default router;