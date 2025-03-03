"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
// import colors from 'colors'
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const Post_1 = __importDefault(require("../models/Post/Post"));
const db_1 = require("./config/db");
const app = (0, express_1.default)();
(0, db_1.connectDB)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
//! Create post
app.post('/api/v1/posts/create', async (req, res) => {
    try {
        const postData = req.body;
        const postCreated = await Post_1.default.create(postData);
        res.json({
            status: 'success',
            message: 'Postの作成に成功しました',
            postCreated,
        });
    }
    catch (err) {
        res.json(err);
    }
});
//! List posts
app.get('/api/v1/posts', async (req, res) => {
    try {
        const getPosts = await Post_1.default.find();
        res.json({
            status: 'success',
            message: 'すべての記事を表示しました',
            getPosts,
        });
    }
    catch (err) {
        res.json(err);
    }
});
//! update post
app.put('/api/v1/posts/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const updatedPost = await Post_1.default.findByIdAndUpdate(postId, req.body, {
            new: true,
        });
        res.json({
            status: 'success',
            message: '記事を更新しました',
            updatedPost,
        });
    }
    catch (err) {
        res.json(err);
    }
});
//! get post
app.get('/api/v1/posts/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const getPost = await Post_1.default.findById(postId);
        res.json({
            status: 'success',
            message: '記事を表示しました',
            getPost,
        });
    }
    catch (err) {
        res.json(err);
    }
});
//! delete post
app.delete('/api/v1/posts/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        await Post_1.default.findByIdAndDelete(postId);
        res.json({
            status: 'success',
            message: '記事を削除しました',
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.default = app;
//# sourceMappingURL=server.js.map