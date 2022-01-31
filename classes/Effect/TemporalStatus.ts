
import { ITemporalStatusConstructor } from "../../interfaces";
import { ICommonStatus } from "../../interfaces/Status.interface";
import { uniqueID } from "../../utils";
import { Status } from "./status";


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

export class TemporalStatus extends Status {

    type = "temporal";
    id = 0;
    name= "permanent Status";
    constructor({ type, appliedOn = "AFTER_TURN", duration = 1, value, name = "" }: (ITemporalStatusConstructor & ICommonStatus)) {
        super({appliedOn, type, value});

        this.checkErrors({duration});
        
    }

    use (){

    }

    checkErrors({ duration }: ITemporalStatusConstructor) {
       
        if (duration < 1) {
            throw new Error("Duration must be positive.");

        }
    }

}
