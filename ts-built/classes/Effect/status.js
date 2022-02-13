"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
const utils_1 = require("../../utils");
class Status {
    constructor({ name = "", appliedOn, type, value }) {
        this.id = 0;
        this.name = "status";
        this.name = name;
        this.id = (0, utils_1.uniqueID)();
        this.checkLogicErrors({ type, appliedOn, value });
    }
    use() {
    }
    checkLogicErrors({ appliedOn, type, value }) {
        if (typeof value === "number" && type === "BUFF" || type === "DEBUFF") {
            throw new Error("Value must be IStats object when type is BUFF or DEBUFF.");
        }
        if (typeof value === "object" && type === "DAMAGE" || type === "REGEN") {
            throw new Error("Value must be a number when type is DAMAGE or REGEN");
        }
    }
}
exports.Status = Status;
