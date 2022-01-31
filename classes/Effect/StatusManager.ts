import { PermanentStatus } from "./PermanentStatus";
import { TemporalStatus } from "./TemporalStatus";


export class StatusManager {


    status: (TemporalStatus | PermanentStatus)[] = []; 


    constructor() {
        //
    }

    //After Attack   -  
    statusAfterAttack() {

    }
    // Before Attack -
    statusBeforeAttack() {

    }
    
    // After Turn -
    statusAfterTurn() {

    }
    
    // Before Turn -
    statusBeforeTurn() {

    }


}
