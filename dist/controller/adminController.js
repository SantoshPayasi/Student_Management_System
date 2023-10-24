"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adminController = {
    testing: (req, res) => {
        console.log("It is working");
        res.status(200).send({
            "message": "Api endpoint is working fine"
        });
    }
};
exports.default = adminController;
