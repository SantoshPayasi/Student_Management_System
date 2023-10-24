"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const childrenController = {
    testing: (req, res) => {
        res.status(200).send("Children Endpoint is running fine move forward");
    }
};
exports.default = childrenController;
