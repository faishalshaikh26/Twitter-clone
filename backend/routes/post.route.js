import express from 'express';
import { getUserPost, getFollowingPosts , getAllPost , commentOnPost, createPost ,deletePost, likeUnlikePost, getLikedPosts} from '../controller/post.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

// Create a new post
router.post('/create',protectRoute, createPost);

// Delete a post by ID
router.delete('/:id', protectRoute, deletePost);

// comments on post
router.post('/comment/:id', protectRoute,commentOnPost);

// like on post
router.post('/like/:id', protectRoute, likeUnlikePost);

// get all post 
router.get('/all', protectRoute,getAllPost);

// get liked posts by user id
router.get('/likes/:id',protectRoute,getLikedPosts) 

// get post of followings
router.get('/following',protectRoute,getFollowingPosts) 

// get post of users
router.get('/user/:username',protectRoute,getUserPost) 

export default router;