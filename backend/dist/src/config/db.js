"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const colors_1 = __importDefault(require("colors"));
const connectDB = async () => {
    try {
        const url = process.env.MONGO_URL;
        const connecton = await mongoose_1.default.connect(url);
        console.log(connecton);
        console.log(colors_1.default.blue.bold(`mongoDBは接続しました`));
    }
    catch (error) {
        console.log(error.message);
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=db.js.map