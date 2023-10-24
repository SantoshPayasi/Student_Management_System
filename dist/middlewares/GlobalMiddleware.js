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
exports.checkcodeisActive = exports.isChilldExist = exports.emailValidator = void 0;
const childrenModel_1 = __importDefault(require("../models/childrenModel"));
const adminModel_1 = __importDefault(require("../models/adminModel"));
const emailValidator = (req, res, next) => {
    const { email, password, name } = req.body;
    if (email == null || password == null || name == null) {
        return res.status(404).send({
            "message": "bad request"
        });
    }
    else {
        var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
        if (emailRegex.test(email)) {
            next();
        }
        else {
            return res.status(404).send({
                "message": "bad request please enter a valid email"
            });
        }
    }
};
exports.emailValidator = emailValidator;
const isChilldExist = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const child = yield childrenModel_1.default.findById({ _id: id });
    if (child) {
        return child;
    }
    else {
        return null;
    }
});
exports.isChilldExist = isChilldExist;
const checkcodeisActive = (code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield adminModel_1.default.findOne({ "accessCode.code": code });
        if (admin) {
            const date = admin.accessCode.updateDate;
            const isvalidCode = (new Date().getTime() - new Date(date).getTime()) > (10 * 60 * 1000) ? false : true;
            //  console.log(new Date().getTime()-new Date(date).getTime())
            //  console.log(isvalidCode)
            return { isValidCode: isvalidCode, adminId: admin._id };
        }
        return "Invalid code";
    }
    catch (error) {
        return error;
    }
});
exports.checkcodeisActive = checkcodeisActive;
