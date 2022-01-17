"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemporalEffect = void 0;
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
 * Dutarion:   bool/number.
 *
 * Value: integer | Istats
 * */
class TemporalEffect {
    constructor({ type, appliedOn = "AFTER_TURN", duration = 1, value }) {
        this.type = "temporal";
        this.id = 0;
        this.id = (0, utils_1.uniqueID)();
        this.checkLogicErrors({ type, appliedOn, duration, value });
    }
    checkLogicErrors({ appliedOn, duration, type, value }) {
        if (typeof value === "number" && type === "BUFF" || type === "DEBUFF") {
            throw new Error("Value must be IStats object when type is BUFF or DEBUFF.");
        }
        if (typeof value === "object" && type === "DAMAGE" || type === "REGEN") {
            throw new Error("Value must be a number when type is DAMAGE or REGEN");
        }
        if (duration < 1) {
            throw new Error("Duration must be positive.");
        }
    }
}
exports.TemporalEffect = TemporalEffect;
