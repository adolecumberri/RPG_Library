import { IStatusStats } from ".";


interface ITemporalStatusConstructor {
    type: "DAMAGE" | "REGEN" | "BUFF" | "DEBUFF";
    appliedOn: "AFTER_ATTACK" | "AFTER_TURN" | "BEFORE_ATTACK" | "BEFORE_TURN"; 
    duration: number;
    value: number | IStatusStats
}

interface IPermanentStatusConstructor {
    type: "DAMAGE" | "REGEN" | "BUFF" | "DEBUFF";
    appliedOn: "AFTER_ATTACK" | "AFTER_TURN" | "BEFORE_ATTACK" | "BEFORE_TURN"; 
    value: number | IStatusStats
}


export {
    ITemporalStatusConstructor,
    IPermanentStatusConstructor
}