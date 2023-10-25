import { Request, Response } from "express";
import AdminSchema from "../models/adminModel";
import mongoose from "mongoose";
import childrenModel from "../models/childrenModel";
import taskSchema from "../models/taskModel";
import bcrypt from "bcrypt";
import { Children } from "../config/interfaces";
import {
  checkcodeisActive,
  isChilldExist,
  generateString
} from "../middlewares/GlobalMiddleware";
const adminController = {
  testing: (req: Request, res: Response) => {
    console.log("It is working");
    res.status(200).send({
      message: "Api endpoint is working fine",
    });
  },
  getAlladmins: async (req: Request, res: Response) => {
    try {
      const admins = await AdminSchema.find().select("-password");
      if (admins.length > 0) {
        return res.status(200).send({
          msg: "users found",
          data: admins,
        });
      } else {
        res.status(200).send({
          msg: "No users are detected",
        });
      }
    } catch (error: any) {
      res.status(400).send({
        mess: "bad request",
        err: error.message,
      });
    }
  },
  createAdmin: async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    try {
      const isUserExist = await AdminSchema.findOne({ email: email.trim() });
      if (isUserExist != null) {
        return res.status(201).send({
          msg: "user already exist please try with another account",
        });
      } else {
        const code = await generateString(10);
        const Newuser = new AdminSchema({
          name: name,
          email: email,
          password: await bcrypt.hash(password, 12),
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
    } catch (error: any) {
      res.status(500).send({
        msg: "bad request",
        err: error.message,
      });
    }
  },
  loginAdmin: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await AdminSchema.findOne({ email: email.trim() });
      if (user) {
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
          const accessCode = {
            code:generateString(10),
            updateDate: String(new Date()),
          };
          console.log(accessCode.code)
          AdminSchema.findOneAndUpdate(
            { email: email.trim() },
            { accessCode: accessCode }
          ).select("-password")
            .then((data) => {
              if (data) {
                return res.status(200).send({
                  msg: "Logged in successfully",
                  Nate: "Code is valid for next 10 minutes to assign tasks to children",
                  data: accessCode,
                });
              }
            });
        } else {
          return res.status(404).send({
            msg: "Invalid credentials please check password",
          });
        }
      }
    } catch (error: any) {
      res.status(400).send({
        mess: "bad request",
        err: error.message,
      });
    }
  },
  addchildren: async (req: Request, res: Response) => {
    try {
      const childDetails: Children = req.body;
      const { adminId } = req.params;
      const isValidObjectId = mongoose.isValidObjectId(adminId);
      const admin = isValidObjectId
        ? await AdminSchema.findById({ _id: adminId })
        : null;
      if (admin) {
        const child = await childrenModel
          .findOne({ email: childDetails.email })
          .select("-password");
        if (child) {
          return res.status(201).send({
            msg: "Child already exist",
            data: child,
          });
        } else {
          if (childDetails.department == null) {
            return res.status(400).send({
              meg: "Department name is required",
            });
          } else {
            const newChild = new childrenModel({
              name: childDetails.name,
              email: childDetails.email,
              password: await bcrypt.hash(childDetails.password, 12),
              department: childDetails.department,
            });

            newChild.save().then((data) => {
              AdminSchema.findByIdAndUpdate(
                { _id: adminId },
                { $push: { childrenList: data._id } }
              ).then((Childrendata) => {
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
      } else {
        return res.status(400).send({
          msg: "Invalid admin please check id",
        });
      }
    } catch (error: any) {
      return res.status(404).send({
        msg: "bad request please check",
        err: error.message,
      });
    }
  },

  addTask: async (req: Request, res: Response) => {
    try {
      const { task } = req.body;
      const { studentId, accessCode } = req.params;
      if (task != null && task.task!=null && task.dueDate!=null && studentId != null && accessCode != null) {
        //  const isactiveaccessCode = AdminSchema.findOne({"accessCode.code":accessCode})
        const generatedDetails = await checkcodeisActive(accessCode);
        if (generatedDetails == "Invalid code") {
          return res.status(400).send({
            msg: "Bad request",
            Note: "Invalid access code ",
          });
        } 
       else if (generatedDetails.isValidCode == false) {
          return res.status(400).send({
            msg: "Code is expired",
            Note: "Please login to get new access code",
          });
        }
        else {
          const isValidChildId = mongoose.isValidObjectId(studentId);
          if (isValidChildId) {
            const isChildExist = await isChilldExist(studentId);
            if (isChildExist) {
              const Newtask = new taskSchema({
                task: task.task,
                assignedBy: generatedDetails.adminId,
                dueDate:task.dueDate
              });

              Newtask.save().then((data) => {
                childrenModel
                  .findByIdAndUpdate(
                    { _id: studentId },
                    { $push: { tasks: data._id } }
                  )
                  .then((Childrendata) => {
                    return res.status(200).send({
                      msg: "task is added successfully",
                      data: data,
                    });
                  });
              });
            } else {
              return res.status(404).send({
                msg: "Child does not exist",
              });
            }
          }
        }
      } else {
        return res.status(400).send({
          msg: "Bad request please check details",
        });
      }
    } catch (error: any) {
      res.status(400).send({
        msg: "Bad request please check details",
        err: error.message,
      });
    }
  },
};



export default adminController;
