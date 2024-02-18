const express = require("express");
const { setPosts, getPosts, editPost, deletePost, likePost, dislikePost } = require("../controllers/post.controller");
const router = express.Router();

// Route pour obtenir toutes les publications
router.get("/", getPosts);

// Route pour créer une nouvelle publication
router.post("/", setPosts);

// Route pour modifier une publication existante en utilisant son identifiant
router.put('/:id', editPost);

// Route pour supprimer une publication existante en utilisant son identifiant
router.delete('/:id', deletePost);

// Route pour liker une publication en utilisant son identifiant
router.patch("/like-post/:id", likePost);

// Route pour ne pas liker une publication en utilisant son identifiant
router.patch("/dislike-post/:id", dislikePost);

module.exports = router;
