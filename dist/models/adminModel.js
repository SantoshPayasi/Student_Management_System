"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const adminModel = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: false,
        default: "Admin User"
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    childrenList: [
        { type: mongoose_1.default.Types.ObjectId, ref: "childrenSchema" },
    ],
    accessCode: {
        code: {
            type: String,
            required: true,
            trim: true
        },
        updateDate: {
            type: Date
        },
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model("adminSchema", adminModel);
