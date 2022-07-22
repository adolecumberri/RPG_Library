import { STATUS_TYPE, STATUS_APPLIED_ON } from "../constants/status"
import { IStats } from "./Character.Interface"

type statusType = "BUFF_FIXED" | "BUFF_PERCENTAGE" | "DEBUFF_FIXED" | "DEBUFF_PERCENTAGE"

type statusAppliedOn = "AFTER_ATTACK" | "AFTER_TURN" | "BEFORE_ATTACK" | "BEFORE_TURN"

interface IStatAffected {
    stat:  keyof IStats,
    value: number
}[]


export { statusType, statusAppliedOn, IStatAffected }
