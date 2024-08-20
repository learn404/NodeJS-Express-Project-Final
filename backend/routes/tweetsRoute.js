import express from 'express';

import { getTweets , likeTweet, addTweet } from '../controllers/tweetsController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/gettweets', requireAuth,  getTweets);
router.post('/like/:tweetId', requireAuth,  likeTweet);
router.post('/addtweet', requireAuth,  addTweet);

export default router;