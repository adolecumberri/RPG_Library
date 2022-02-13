"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemporalStatus = void 0;
const status_1 = require("./status");
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
class TemporalStatus extends status_1.Status {
    constructor({ type, appliedOn = "AFTER_TURN", duration = 1, value, name = "" }) {
        super({ appliedOn, type, value });
        this.type = "temporal";
        this.id = 0;
        this.name = "permanent Status";
        this.checkErrors({ duration });
    }
    use() {
    }
    checkErrors({ duration }) {
        if (duration < 1) {
            throw new Error("Duration must be positive.");
        }
    }
}
exports.TemporalStatus = TemporalStatus;
