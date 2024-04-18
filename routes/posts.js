var express = require('express');
const Post = require('../models/Post');
var fileUpload = require('express-fileupload');
const { authToken } = require('../middlewares/auth');
var router = express.Router();

router.get('/', authToken, async (req, res) => {
    try {
        let posts = await Post.find({ user: req.user.id });
        if (posts.length > 0) {
            return res.json(posts);
        } else {
            return res.status(404).json({ message: "You don't have any posts" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/:id', authToken, async (req, res) => {
    try {
        let post = await Post.findOne({ _id: req.params.id, user: req.user.id });
        if (post) {
            return res.json(post);
        } else {
            return res.status(404).json({ message: "You don't have this post" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/create', authToken, async (req, res) => {
    try {
        let post = new Post({
            title: req.body.title,
            body: req.body.body,
            user: req.user.id,
            image: req.body.image,
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            designation: req.body.designation,
            gender: req.body.gender,
            course: req.body.course
        });
        let savedPost = await post.save();
        return res.status(201).json({ message: "Post created", post: savedPost });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.put('/:id', authToken, async (req, res) => {
    try {
        let post = await Post.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, {
            title: req.body.title,
            body: req.body.body,
            image: req.body.image,
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            designation: req.body.designation,
            gender: req.body.gender,
            course: req.body.course
        }, { new: true });
        if (post) {
            return res.json({ message: "Post updated", post: post });
        } else {
            return res.status(404).json({ message: "Post not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.delete("/:id", authToken, async (req, res) => {
    try {
        let post = await Post.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (post) {
            return res.json({ message: "Post deleted" });
        } else {
            return res.status(404).json({ message: "Post not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
