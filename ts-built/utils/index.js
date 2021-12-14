"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniqueID = void 0;
function uniqueID() {
    return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
}
exports.uniqueID = uniqueID;
;
