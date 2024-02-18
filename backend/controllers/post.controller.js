const PostModel = require("../models/post.model");

module.exports.getPosts = async (req, res) => {
    try {
        const posts = await PostModel.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des publications" });
    }
};

module.exports.setPosts = async (req, res) => {
    try {
        if (!req.body.message) {
            return res.status(400).json({ message: "Merci d'ajouter un message" });
        }
        
        const post = await PostModel.create({
            message: req.body.message,
            author: req.body.author,
        });
        
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de la publication" });
    }
};

module.exports.editPost = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        
        if (!post) {
            return res.status(404).json({ message: "Ce post n'existe pas" });
        }
        
        const updatedPost = await PostModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la modification de la publication" });
    }
};

module.exports.deletePost = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        
        if (!post) {
            return res.status(404).json({ message: "Ce post n'existe pas" });
        }
        
        await post.deleteOne(); // Utilisez deleteOne() pour supprimer le document
        res.status(200).json({ message: "Message supprimé" + req.params.id });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de la publication" });
    }
};

module.exports.likePost = async (req, res) => {
    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { likers: req.body.userId } }, // Utilisez $addToSet pour ajouter un élément à un tableau sans doublons
            { new: true }
        ).then((data) => res.status(200).send(data));
       
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports.dislikePost = async (req, res) => {
    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { likers: req.body.userId } }, // Utilisez $addToSet pour ajouter un élément à un tableau sans doublons
            { new: true }
        ).then((data) => res.status(200).send(data));
       
    } catch (err) {
        res.status(400).json(err);
    }
};

