"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermanentStatus = void 0;
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
 *
 * Value: integer | Istats
 * */
//This Status will last the whole  fight.
class PermanentStatus extends status_1.Status {
    constructor({ appliedOn, type, value, name = "" }) {
        super({ appliedOn, type, value });
        this.type = "permanent";
        //!unused
        this.checkErrors();
    }
    use() {
    }
    //!unused
    checkErrors() {
    }
}
exports.PermanentStatus = PermanentStatus;
