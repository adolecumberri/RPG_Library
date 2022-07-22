import { STATUS_APPLIED_ON, STATUS_TYPE } from "../../constants/status"
import { checkDuration } from "../../helper/errorControllers"
import { IStats } from "../../interfaces"
import { IStatAffected, statusAppliedOn, statusType } from "../../interfaces/status.interface"
import Character from "../Character"

interface ITemporalStatus {
    appliedOn?: statusAppliedOn
    character?: Character
    duration?: number
    statAffected: IStatAffected[]
    type?: statusType
}

//!TODO: poder aplicar en mas de un solo elemento.
class TemporalStatus {

    appliedOn = STATUS_APPLIED_ON.AFTER_TURN

    character: Character

    duration = 1

    isActive = true

    statAffected: IStatAffected[] = []

    type = STATUS_TYPE.BUFF_FIXED

    constructor(
        {
            appliedOn = <statusAppliedOn> STATUS_APPLIED_ON.AFTER_TURN,
            character,
            duration = 1,
            type = <statusType> STATUS_TYPE.BUFF_FIXED ,
            statAffected = []
        }: ITemporalStatus) {

            this.appliedOn = appliedOn
            this.character = character
            this.statAffected = statAffected
            this.type = type

            this.addDuration(duration)
            this.load(character)
            
    }

    addDuration = ( value: number ) => {
        
        this.isActive = value !== 0
        this.duration = value < 0 ? 0 : value
        checkDuration(this.duration)

    }
    
    activate = () => {
        if( !this.character ){  
            this.addDuration( this.duration - 1 )
            return
        }

        if( !this.isActive ){
            return
        }
        
        const ACTION = {
            [STATUS_TYPE.BUFF_FIXED] : this.#loadBuffFixed,
            [STATUS_TYPE.BUFF_PERCENTAGE] : this.#loadBuffPercentage,
            [STATUS_TYPE.DEBUFF_FIXED] : this.#loadDebuffFixed,
            [STATUS_TYPE.DEBUFF_PERCENTAGE] : this.#loadDebuffPercentage,
        }

        //the stat changes the value after the ACTION dictionary updates his value with an ecuation.
        this.statAffected.forEach( (stat) => {
            this.character.stats[stat.stat] = ACTION[this.type](this.character.stats[stat.stat], stat.value)
        })
        this.addDuration( this.duration - 1 )
    }
    
    load: (c: Character) => void  = ( c ) => {
        this.character = c
    }

    #loadBuffFixed = ( value: number, operator: number ) => value + operator

    #loadBuffPercentage = ( value: number, operator: number ) => value + (value * (operator / 100))

    #loadDebuffFixed = ( value: number, operator: number ) => value - operator

    #loadDebuffPercentage = ( value: number, operator: number ) => value - (value * (operator / 100))

}

export default TemporalStatus
