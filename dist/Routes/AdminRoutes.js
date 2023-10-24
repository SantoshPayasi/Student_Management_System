"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const adminController_1 = __importDefault(require("../controller/adminController"));
// Testing for admin endPoint
Router.get("/", adminController_1.default.testing);
// EndPoint to create admin
exports.default = Router;
