"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const childrenController_1 = __importDefault(require("../controller/childrenController"));
// Testing app 
Router.get("/", childrenController_1.default.testing);
// get all tasks
Router.post("/getAlltasks", childrenController_1.default.getAlltasks);
// Update Perticular task status
Router.get("/updateStatus/:studentId/:taskId", childrenController_1.default.updatePerticularTaskStatus);
exports.default = Router;
