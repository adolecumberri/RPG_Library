import Character from "../classes/Character";

interface IStatusStats {
    accuracy?: number;
    attack?: number;
    att_speed?: number;
    crit?: number;
    critDamage?: number;
    defence?: number;
    evasion?: number;
    magicalAttack?: number;
}

interface IActions {
    addKill?: (character: Character) => any;
    attack?: (character: Character) => any;
    calcNextTurn?: (character: Character) => any;
    defend?: (character: Character) => any;
    dies?: (character: Character) => any;
    endFight?: (character: Character) => any;
    endTurn?: (character: Character) => any;
    revive?: (character: Character) => any;
    startFight?: (character: Character) => any;
    startTurn?: (character: Character) => any;
    straightDamage?: (character: Character) => any;
}

//! Discriminator used to check interface in conditions.
interface IVariation {
    discriminator: "IVariation",
    maxVariation: number,
    minVariation: number
}

export { IActions, IStatusStats, IVariation }