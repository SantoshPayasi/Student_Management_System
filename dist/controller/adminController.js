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
const adminModel_1 = __importDefault(require("../models/adminModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const childrenModel_1 = __importDefault(require("../models/childrenModel"));
const taskModel_1 = __importDefault(require("../models/taskModel"));
// import nanoid from "nanoid"
const bcrypt_1 = __importDefault(require("bcrypt"));
const GlobalMiddleware_1 = require("../middlewares/GlobalMiddleware");
const adminController = {
    testing: (req, res) => {
        console.log("It is working");
        res.status(200).send({
            message: "Api endpoint is working fine",
        });
    },
    getAlladmins: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const admins = yield adminModel_1.default.find().select("-password");
            if (admins.length > 0) {
                return res.status(200).send({
                    msg: "users found",
                    data: admins,
                });
            }
            else {
                res.status(200).send({
                    msg: "No users are detected",
                });
            }
        }
        catch (error) {
            res.status(400).send({
                mess: "bad request",
                err: error.message,
            });
        }
    }),
    createAdmin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password, name } = req.body;
        try {
            const isUserExist = yield adminModel_1.default.findOne({ email: email.trim() });
            if (isUserExist != null) {
                return res.status(201).send({
                    msg: "user already exist please try with another account",
                });
            }
            else {
                const code = yield generateString(10);
                const Newuser = new adminModel_1.default({
                    name: name,
                    email: email,
                    password: yield bcrypt_1.default.hash(password, 12),
                    accessCode: {
                        code: code,
                        updateDate: String(new Date()),
                    },
                });
                Newuser.save().then((data) => {
                    if (data) {
                        res.status(200).send({
                            message: "User created successfully",
                            Note: "Code is valid for next 10 minutes to assign tasks to children",
                            data: data,
                        });
                    }
                });
            }
        }
        catch (error) {
            res.status(500).send({
                msg: "bad request",
                err: error.message,
            });
        }
    }),
    loginAdmin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, passsword } = req.body;
        try {
            const user = yield adminModel_1.default.findOne({ email: email.trim() });
            if (user) {
                const isValidPassword = yield bcrypt_1.default.compare(passsword, user.password);
                if (isValidPassword) {
                    const accessCode = {
                        code: generateString(10),
                        updateDate: String(new Date()),
                    };
                    adminModel_1.default.findOneAndUpdate({ email: email.trim() }, { accessCode: accessCode })
                        .select("-password")
                        .then((data) => {
                        if (data) {
                            return res.status(200).send({
                                msg: "Logged in successfully",
                                Nate: "Code is valid for next 10 minutes to assign tasks to children",
                                data: data,
                            });
                        }
                    });
                }
                else {
                    return res.status(404).send({
                        msg: "Invalid credentials please check password",
                    });
                }
            }
        }
        catch (error) {
            res.status(400).send({
                mess: "bad request",
                err: error.message,
            });
        }
    }),
    addchildren: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const childDetails = req.body;
            const { adminId } = req.params;
            const isValidObjectId = mongoose_1.default.isValidObjectId(adminId);
            const admin = isValidObjectId
                ? yield adminModel_1.default.findById({ _id: adminId })
                : null;
            if (admin) {
                const child = yield childrenModel_1.default
                    .findOne({ email: childDetails.email })
                    .select("-password");
                if (child) {
                    return res.status(201).send({
                        msg: "Child already exist",
                        data: child,
                    });
                }
                else {
                    if (childDetails.department == null) {
                        return res.status(400).send({
                            meg: "Department name is required",
                        });
                    }
                    else {
                        const newChild = new childrenModel_1.default({
                            name: childDetails.name,
                            email: childDetails.email,
                            password: yield bcrypt_1.default.hash(childDetails.password, 12),
                            department: childDetails.department,
                        });
                        newChild.save().then((data) => {
                            adminModel_1.default.findByIdAndUpdate({ _id: adminId }, { $push: { childrenList: data._id } }).then((Childrendata) => {
                                if (data) {
                                    return res.status(200).send({
                                        msg: "Children in added successfully",
                                        data: data,
                                    });
                                }
                            });
                        });
                    }
                }
            }
            else {
                return res.status(400).send({
                    msg: "Invalid admin please check id",
                });
            }
        }
        catch (error) {
            return res.status(404).send({
                msg: "bad request please check",
                err: error.message,
            });
        }
    }),
    addTask: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { task } = req.body;
            const { studentId, accessCode } = req.params;
            if (task != null && studentId != null && accessCode != null) {
                //  const isactiveaccessCode = AdminSchema.findOne({"accessCode.code":accessCode})
                const generatedDetails = yield (0, GlobalMiddleware_1.checkcodeisActive)(accessCode);
                if (generatedDetails == "Invalid code") {
                    return res.status(400).send({
                        msg: "Bad request",
                        Note: "Invalid access code ",
                    });
                }
                else if (generatedDetails.isvalidCode == false) {
                    return res.status(400).send({
                        msg: "Code is expired",
                        Note: "Please login to get new access code",
                    });
                }
                else {
                    const isValidChildId = mongoose_1.default.isValidObjectId(studentId);
                    if (isValidChildId) {
                        const isChildExist = yield (0, GlobalMiddleware_1.isChilldExist)(studentId);
                        if (isChildExist) {
                            const Newtask = new taskModel_1.default({
                                task: task.task,
                                assignedBy: generatedDetails.adminId,
                            });
                            Newtask.save().then((data) => {
                                childrenModel_1.default
                                    .findByIdAndUpdate({ _id: studentId }, { $push: { tasks: data._id } })
                                    .then((Childrendata) => {
                                    return res.status(200).send({
                                        msg: "task is added successfully",
                                        data: data,
                                    });
                                });
                            });
                        }
                        else {
                            return res.status(404).send({
                                msg: "Child does not exist",
                            });
                        }
                    }
                }
            }
            else {
                return res.status(400).send({
                    msg: "Bad request please check details",
                });
            }
        }
        catch (error) {
            res.status(400).send({
                msg: "Bad request please check details",
                err: error.message,
            });
        }
    }),
};
function generateString(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
exports.default = adminController;
