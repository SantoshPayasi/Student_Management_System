"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const taskModel = new mongoose_1.default.Schema({
    task: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    isPanding: {
        type: Boolean,
        default: true
    },
    isOverDue: {
        type: Boolean,
        default: true
    },
    assignedBy: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "adminSchema"
    },
    dueDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model("taskSchema", taskModel);
