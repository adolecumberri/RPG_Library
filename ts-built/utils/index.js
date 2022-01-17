"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniqueID = exports.percentageToNumber = exports.isPercentage = void 0;
function uniqueID() {
    return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
}
exports.uniqueID = uniqueID;
;
let isPercentage = (data) => /^(\d+|(\.\d+))(\.\d+)?%$/.test(data);
exports.isPercentage = isPercentage;
let percentageToNumber = (percentage) => Math.floor(parseFloat(percentage) / 100);
exports.percentageToNumber = percentageToNumber;
