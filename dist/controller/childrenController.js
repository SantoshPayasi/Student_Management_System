"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const childrenModel_1 = __importDefault(require("../models/childrenModel"));
const taskModel_1 = __importDefault(require("../models/taskModel"));
const GlobalMiddleware_1 = require("../middlewares/GlobalMiddleware");
const childrenController = {
    testing: (req, res) => {
        res.status(200).send("Children Endpoint is running fine move forward");
    },
    getAlltasks: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { _id } = req.body;
            const isValidObjectId = mongoose_1.default.isValidObjectId(_id);
            if (isValidObjectId) {
                let childDetails = yield childrenModel_1.default
                    .findById({ _id })
                    .populate({
                    path: "tasks",
                })
                    .select("-password");
                if (childDetails) {
                    return res.status(200).send({
                        msg: "Tasks are fetched successfully",
                        data: childDetails,
                    });
                }
                else {
                    return res.status(404).send({
                        msg: "Unable to fetch details please check criedentials",
                    });
                }
            }
            else {
                return res.status(404).send({
                    msg: "Invalid id please check",
                });
            }
        }
        catch (error) {
            return res.status(404).send({
                msg: "Something went wrong invalid data",
                err: error.message
            });
        }
    }),
    updatePerticularTaskStatus: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { taskId, studentId } = req.params;
        try {
            if (taskId && studentId && mongoose_1.default.isValidObjectId(studentId) && mongoose_1.default.isValidObjectId(taskId)) {
                const child = yield (0, GlobalMiddleware_1.isChilldExist)(studentId);
                if (child) {
                    const isTaskContains = child.tasks.includes(taskId);
                    if (isTaskContains) {
                        taskModel_1.default.findByIdAndUpdate({ _id: taskId }, { isCompleted: true, isPanding: false, isOverDue: false })
                            .then(data => {
                            if (data) {
                                res.status(200).send({
                                    msg: "status is updated successfully"
                                });
                            }
                        });
                    }
                    else {
                        return res.status(400).send({
                            "msg": "Invvalid access task is not assigned to you"
                        });
                    }
                }
                else {
                    return res.status(404).send({
                        msg: "Child does not exist you invalid id"
                    });
                }
            }
            else {
                return res.status(400).send({
                    "msg": "Bad request please send valid cridentials"
                });
            }
        }
        catch (error) {
            return res.status(400).send({
                "msg": "Bad request",
                err: error.message
            });
        }
    })
};
exports.default = childrenController;
