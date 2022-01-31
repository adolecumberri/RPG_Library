import { IPermanentStatusConstructor } from "../../interfaces";
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
 * 
 * Value: integer | Istats
 * */

//This Status will last the whole  fight.
export class PermanentStatus extends Status {

    type = "permanent";
    
    constructor({ appliedOn, type, value, name="" }: (IPermanentStatusConstructor & ICommonStatus)) {
       super({appliedOn, type, value});

       //!unused
        this.checkErrors();
    }

    use (){

    }

    //!unused
    checkErrors() {
      
    }

}
