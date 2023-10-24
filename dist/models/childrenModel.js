"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const childrenModel = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    tasks: [
        { type: mongoose_1.default.Types.ObjectId, ref: "taskSchema" }
    ]
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model("childrenSchema", childrenModel);
