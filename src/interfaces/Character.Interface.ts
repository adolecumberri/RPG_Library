import Character from "../classes/Character";

interface IStats {
    accuracy: number
    attack: number
    attack_interval: number
    attack_speed: number
    crit: number
    crit_multiplier: number
    current_hp: number
    defence: number
    evasion: number
    hp: number
}

interface IActions {
    addKill?: (character: Character) => any
    attack?: (character: Character) => any
    calcNextTurn?: (character: Character) => any
    defend?: (character: Character) => any
    dies?: (character: Character) => any
    endFight?: (character: Character) => any
    endTurn?: (character: Character) => any
    revive?: (character: Character) => any
    startFight?: (character: Character) => any
    startTurn?: (character: Character) => any
    straightDamage?: (character: Character) => any
}

export { IActions, IStats }
