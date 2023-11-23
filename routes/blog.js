const express = require('express');
const router = express.Router();

// Import controllers
const {createPost, getAllPost, getOnePost, updatePost, deletePost} = require('../controllers/postController');
const { likePost, unlikePost} = require('../controllers/likeController')
const {createComment, getAllComment, updateComment, deleteComment} = require('../controllers/commentController');

// Mount routes

// Posts routes
router.post('/posts/create', createPost);
router.get('/posts', getAllPost);
router.get('/posts/:id', getOnePost);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);

// Like routes
router.post('/likes/like', likePost);
router.post('/likes/unlike', unlikePost);

// comments routes
router.post('/comments/create', createComment);
router.get('/comments', getAllComment);
router.put('/comments/:id', updateComment);
router.delete('/comments/:id', deleteComment)



// Export routes
module.exports = router;