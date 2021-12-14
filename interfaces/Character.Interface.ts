import { Character } from "../hero/Character";




interface IStats {
    accuracy?: number;
    attack?: number;
    attack_speed?: number;
    crit?: number;
    critDamage?: number;
    deffence?: number;
    evasion?: number;
    hp?: number;
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

interface ICharacterConstructor {
    id: number | string,
    stats: IStats,
    variation: number | {
        maxVariation: number,
        minVariation: number
    },
    actions: IActions,
}

export { IActions, ICharacterConstructor, IStats }