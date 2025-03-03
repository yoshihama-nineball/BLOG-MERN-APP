"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: Object,
        default: null,
    },
    email: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    googleId: {
        type: String,
        required: false,
    },
    authMethod: {
        type: String,
        enum: ['google', 'local', 'facebook', 'github'],
        required: true,
        default: 'local',
    },
    passwordResetToken: {
        type: String,
        default: null,
    },
    accountVerificationToken: {
        type: String,
        default: null,
    },
    accountVerificationExpires: {
        type: Date,
        default: null,
    },
    passwordResetExpires: {
        type: Date,
        default: null,
    },
    posts: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Post' }],
    totalEarnings: { type: Number, default: 0 },
    nextEarningDate: {
        type: Date,
        default: () => new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
    },
    Plan: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Plan',
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    payments: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Payment' }],
    hasSelectedPlan: { type: Boolean, default: false },
    lastLogin: { type: Date, default: Date.now },
    followers: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
//# sourceMappingURL=User.js.map