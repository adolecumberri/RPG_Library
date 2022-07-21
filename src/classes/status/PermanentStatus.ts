import { STATUS_APPLIED_ON, STATUS_TYPE } from "../../constants/status"
import { IStats } from "../../interfaces"
import { statusAppliedOn, statusType } from "../../interfaces/status.interface"
import Character from "../Character"

interface IPermanentStatus {
    type?: statusType
    appliedOn?: statusAppliedOn
    value?: number
    statAffected: keyof IStats
    character?: Character
}

//!TODO: poder aplicar en mas de un solo elemento.
class PermanentStatus {

    appliedOn = STATUS_APPLIED_ON.AFTER_TURN

    character: Character

    statAffected = null

    type = STATUS_TYPE.BUFF_FIXED

    value = 0

    constructor(
        {
            type = <statusType> STATUS_TYPE.BUFF_FIXED ,
            appliedOn = <statusAppliedOn> STATUS_APPLIED_ON.AFTER_TURN,
            value = 0,
            statAffected,
            character
        }: IPermanentStatus) {

            this.appliedOn = appliedOn
            this.character = character
            this.statAffected = statAffected
            this.type = type
            this.value = value

            this.load(character)
            
    }

    load: (c: Character) => void  = ( c ) => {
        this.character = c
    }

    activate = () => {
        let statAffected = this.character.stats[this.statAffected]

        const ACTION = {
            [STATUS_TYPE.BUFF_FIXED] : this.#loadBuffFixed,
            [STATUS_TYPE.BUFF_PERCENTAGE] : this.#loadBuffPercentage,
            [STATUS_TYPE.DEBUFF_FIXED] : this.#loadDebuffFixed,
            [STATUS_TYPE.DEBUFF_PERCENTAGE] : this.#loadDebuffPercentage,
        }

        //the stat changes the value after the ACTION dictionary updates his value with an ecuation.
        this.character.stats[this.statAffected] = ACTION[this.type]( statAffected )
    }

    #loadBuffFixed = ( value: number ) => value + this.value

    #loadBuffPercentage = ( value: number ) => value + (value * (this.value / 100))

    #loadDebuffFixed = ( value: number ) => value - this.value

    #loadDebuffPercentage = ( value: number ) => value - (value * (this.value / 100))

}

export default PermanentStatus 