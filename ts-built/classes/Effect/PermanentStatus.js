"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermanentStatus = void 0;
const utils_1 = require("../../utils");
/**
 *
 * types:   damage - quito vida
 *          regen   - curo vida
 *          buff    - cambia stats
 *          debuff  - cambia stats
 *
 * appliedOn:   After Attack   -
 *              Before Attack -
 *              After Turn -
 *              Before Turn -
 *
 *
 * Value: integer | Istats
 * */
//This Status will last the whole  fight.
class PermanentStatus {
    constructor({ appliedOn, type, value }) {
        this.type = "permanent";
        this.id = 0;
        this.id = (0, utils_1.uniqueID)();
        this.checkLogicErrors({ appliedOn, type, value });
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
exports.PermanentStatus = PermanentStatus;
