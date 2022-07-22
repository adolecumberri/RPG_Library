import { statusAppliedOn, statusType } from "../interfaces/status.interface"

const STATUS_TYPE: {[x: string]: statusType} = {
    BUFF_FIXED: "BUFF_FIXED",
    BUFF_PERCENTAGE: "BUFF_PERCENTAGE",
    DEBUFF_FIXED: "DEBUFF_FIXED" ,
    DEBUFF_PERCENTAGE: "DEBUFF_PERCENTAGE"
}

const STATUS_APPLIED_ON: {[x: string]: statusAppliedOn} = {
    AFTER_ATTACK: "AFTER_ATTACK",
    AFTER_TURN: "AFTER_TURN",
    BEFORE_ATTACK: "BEFORE_ATTACK",
    BEFORE_TURN: "BEFORE_TURN"
}

export {
    STATUS_TYPE,
    STATUS_APPLIED_ON
}