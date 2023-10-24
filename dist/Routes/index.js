"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AdminRoutes_1 = __importDefault(require("./AdminRoutes"));
const childrenRoutes_1 = __importDefault(require("./childrenRoutes"));
const app = (0, express_1.default)();
const routes = {
    AdminRoutes: AdminRoutes_1.default,
    childrenRoutes: childrenRoutes_1.default
};
// const router = ()=>{
// app.use("admin", AdminRoutes)
// app.use("children", childrenRoutes)
// }
exports.default = routes;
