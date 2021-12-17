import { IStatsEffect } from ".";


interface ITemporalEffectConstructor {
    type: "DAMAGE" | "REGEN" | "BUFF" | "DEBUFF";
    appliedOn: "AFTER_ATTACK" | "AFTER_TURN" | "BEFORE_ATTACK" | "BEFORE_TURN"; 
    duration: number;
    value: number | IStatsEffect
}

interface IPermanentEffectConstructor {
    type: "DAMAGE" | "REGEN" | "BUFF" | "DEBUFF";
    appliedOn: "AFTER_ATTACK" | "AFTER_TURN" | "BEFORE_ATTACK" | "BEFORE_TURN"; 
    value: number | IStatsEffect
}


export {
    ITemporalEffectConstructor,
    IPermanentEffectConstructor
}