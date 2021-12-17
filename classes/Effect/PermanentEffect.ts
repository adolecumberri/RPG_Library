import { IPermanentEffectConstructor } from "../../interfaces";


/**
 * 
 * types:   damage - quito vida
 *          regen   - curo vida
 *          buff    - cambia stats 
 *          debuff  - cambia stats
 * 
 * appliedOn:   After Attack   -  
 *           Before Attack -
 *           After Turn -
 *           Before Turn -
 * 
 * 
 * Value: integer | Istats
 * */

//This effect will last the whole  fight.
export class PermanentEffect {
    constructor({ appliedOn, type, value }: IPermanentEffectConstructor) {
        this.checkLogicErrors({appliedOn, type, value})
    }

    checkLogicErrors({appliedOn, type, value}: IPermanentEffectConstructor){
        if(typeof value === "number" && type === "BUFF" || type === "DEBUFF" ){
            throw new Error("Value must be IStats object when type is BUFF or DEBUFF.");
        }

        if(typeof value === "object" && type === "DAMAGE" || type === "REGEN"){
            throw new Error("Value must be a number when type is DAMAGE or REGEN")
        }
    }

}
