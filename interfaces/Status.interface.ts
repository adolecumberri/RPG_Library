import { IStatusStats } from ".";

type IAppliedOn =  "AFTER_ATTACK" | "AFTER_TURN" | "BEFORE_ATTACK" | "BEFORE_TURN";

interface ICommonStatus {
    type: "DAMAGE" | "REGEN" | "BUFF" | "DEBUFF";
    appliedOn: IAppliedOn; 
    value: number | IStatusStats;
    name?: string;
}


interface ITemporalStatusConstructor {
    duration: number;
}

interface IPermanentStatusConstructor {
}


export {
    IAppliedOn,
    ICommonStatus,
    ITemporalStatusConstructor,
    IPermanentStatusConstructor
}