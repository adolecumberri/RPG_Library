
import { ICharacterConstructor, IStats } from '../interfaces'
import { uniqueID } from '../utils';
// import { StatsManager } from './fightStatsManager';


export class Character {
    id?: number;
    stats?: IStats
    variation?: number;
    constructor({
        id,
        stats,
        variation,
    }: ICharacterConstructor) {
        this.id = id ? id : uniqueID();
        this.stats = stats;
        this.variation = variation;
    }


    startTurn: () => void = () => { };

    endTurn: () => void = () => { };

    startFight: () => void = () => {};

    endFight: () => void = () => {};

    attack = () => {};

    defend = () => {};

    //daño directo sin pasar por armadura
    straightDamage = () => {};

    //HERO DIES
    dies = () => {};

    //HERO WINS
    addKill = () => {};

    revive = () => {}

    //calculo siguiente turno. Habilidades de velocidad lo sobreescribiran.
    calcNextTurn = () => {};

    rand = (max: number, min = 0) => Math.round(Math.random() * (max - min) + min);

    //function to load probabilities.
    getProb = () => Math.random();

}

