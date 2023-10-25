"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const adminController_1 = __importDefault(require("../controller/adminController"));
const GlobalMiddleware_1 = require("../middlewares/GlobalMiddleware");
// Testing for admin endPoint
Router.get("/", adminController_1.default.testing);
// EndPoint to create admin
Router.post("/createAdmin", GlobalMiddleware_1.emailValidator, adminController_1.default.createAdmin);
// Endpoint to get all admins
Router.get("/getAlladminsdetail", adminController_1.default.getAlladmins);
// Login with admin details
Router.post("/login", adminController_1.default.loginAdmin);
// Add children in database
Router.post("/addChildren/:adminId", GlobalMiddleware_1.emailValidator, adminController_1.default.addchildren);
// Add task to the children
Router.post("/addTask/:studentId/:accessCode", adminController_1.default.addTask);
exports.default = Router;
