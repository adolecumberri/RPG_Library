import { ICommonStatus } from "../../interfaces/Status.interface";
import { uniqueID } from "../../utils";



export class Status {
    id = 0;
    name = "status";

    constructor( {name = "", appliedOn, type, value} : ICommonStatus){
        this.name = name;
        this.id = uniqueID();

        this.checkLogicErrors({ type, appliedOn, value });
        
    }



    use (){

    }

    checkLogicErrors({ appliedOn, type, value }: ICommonStatus) {
        if (typeof value === "number" && type === "BUFF" || type === "DEBUFF") {
            throw new Error("Value must be IStats object when type is BUFF or DEBUFF.");
        }

        if (typeof value === "object" && type === "DAMAGE" || type === "REGEN") {
            throw new Error("Value must be a number when type is DAMAGE or REGEN")
        }

       
    }

}