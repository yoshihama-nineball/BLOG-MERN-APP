"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const earningSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    post: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Post',
    },
    amount: {
        type: Number,
        required: true,
    },
    calculatedOn: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});
const Earning = mongoose_1.default.model('Earning', earningSchema);
exports.default = Earning;
//# sourceMappingURL=Earning.js.map