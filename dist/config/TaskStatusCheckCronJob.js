"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskStatus = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const taskModel_1 = __importDefault(require("../models/taskModel"));
const updateTaskStatus = () => {
    node_cron_1.default.schedule("0 */1 * * * *", () => {
        const currentDate = new Date();
        taskModel_1.default.updateMany({ dueDate: { $lt: currentDate.toISOString() }, isCompleted: { $ne: true } }, { $set: { isOverDue: true } }).then((data) => {
            if (data) {
                console.log(data);
            }
        }).catch(e => {
            console.log(e);
        });
    });
};
exports.updateTaskStatus = updateTaskStatus;
