const express = require("express");
const { PostModel } = require("../models/Post.model");
const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
    const {device, device1, device2} = req.query;
    // console.log(device, device1, device2);

    try {
        const query = {authorId: req.body.authorId};

        if (device) {
            query.device = device;
        }
        if (device1 && device2) {
            query.device = [device1, device2];
        }
        // console.log(query);

        const posts = await PostModel.find(query);

        res.status(200).send(posts);
    }
    catch(err) {
        res.status(400).send({"err": err.message});
    }
});


postRouter.post("/create", async (req, res) => {
    try {
        const post = new PostModel(req.body);
        await post.save();

        res.status(200).send({"msg": "Post Created"});
    }
    catch(err) {
        res.status(400).send({"err": err.message});
    }
});


postRouter.patch("/update/:postId", async (req, res) => {
    const {postId} = req.params;

    try {
        await PostModel.findByIdAndUpdate({_id: postId}, req.body);

        res.status(200).send({"msg": "Post Updated"});
    }
    catch(err) {
        res.status(400).send({"err": err.message});
    }
});


postRouter.delete("/delete/:postId", async (req, res) => {
    const {postId} = req.params;

    try {
        await PostModel.findByIdAndDelete({_id: postId});

        res.status(200).send({"msg": "Post Deleted"});
    }
    catch(err) {
        res.status(400).send({"err": err.message});
    }
});


module.exports = {
    postRouter
}
