
import { IActions, ICharacterConstructor, IStats } from '../interfaces'
import { uniqueID } from './../utils';
// import { StatsManager } from './fightStatsManager';



// * @param {type}   var           Description.
// * @param {type}   [var]         Description of optional variable.
// * @param {type}   [var=default] Description of optional variable with default variable.
// * @param {Object} objectVar     Description.
// * @param {type}   objectVar.key Description of a key in the objectVar parameter.


/**
 * @param   id              id.
 * @param   stats           Description.
 * @param   variation       Description.
 */
export class Character {
    id: number | string;
    stats?: IStats = {
        accuracy: 1,
        attack: 0,
        crit: 0,
        critDamage: 1,
        evasion: 0,
        hp: 0,
    }; //Todo: apply
    variation?: number | {
        maxVariation: number,
        minVariation: number
    } //Todo: apply
    actions: IActions;
    constructor({
        id,
        stats,
        variation,
        actions
    }: ICharacterConstructor) {
        this.id = id ? id : uniqueID();
        this.stats = stats;
        this.variation = variation;
        this.actions = actions;
    }

    addKill(callback: (action_addKill_return?: any) => void) {

        //if action.addkill execute it as this as parameter
        let callbackParam = this.actions.addKill && this.actions.addKill(this);

        callback(callbackParam);
    };


    attack(callback: (action_attack_return?: any) => void) {

        //if action.attack execute it as this as parameter
        let callbackParam = this.actions.attack && this.actions.attack(this);

        callback(callbackParam);
    };

    //TODO: control attack_speed > 0.
    calcNextTurn(callback: (action_calcNextTurn_return?: any) => void) {

        //if action.calcNextTurn execute it as this as parameter
        let callbackParam = this.actions.calcNextTurn && this.actions.calcNextTurn(this);

        callback(callbackParam);
    };


    defend(callback: (action_defend_return?: any) => void) {

        //if action.defend execute it as this as parameter
        let callbackParam = this.actions.defend && this.actions.defend(this);

        callback(callbackParam);
    };

    //HERO DIES
    dies(callback: (action_dies_return?: any) => void) {

        //if action.dies execute it as this as parameter
        let callbackParam = this.actions.dies && this.actions.dies(this);

        callback(callbackParam);
    };

    endFight(callback: (action_endFight_return?: any) => void) {

        //if action.endFight execute it as this as parameter
        let callbackParam = this.actions.endFight && this.actions.endFight(this);

        callback(callbackParam);
    };


    endTurn(callback: (action_endTurn_return?: any) => void) {

        //if action.endTurn execute it as this as parameter
        let callbackParam = this.actions.endTurn && this.actions.endTurn(this);

        callback(callbackParam);
    };

    revive(callback: (action_revive_return?: any) => void) {

        //if action.revive execute it as this as parameter
        let callbackParam = this.actions.revive && this.actions.revive(this);

        callback(callbackParam);
    };

    startFight(callback: (action_startFight_return?: any) => void) {

        //if action.startFight execute it as this as parameter
        let callbackParam = this.actions.startFight && this.actions.startFight(this);

        callback(callbackParam);
    };

    startTurn(callback: (action_startTurn_return?: any) => void) {

        //if action.startTurn execute it as this as parameter
        let callbackParam = this.actions.startTurn && this.actions.startTurn(this);

        callback(callbackParam);
    };


    //daño directo sin pasar por armadura
    straightDamage(callback: (action_straightDamage_return?: any) => void) {
        //if action.startTurn execute it as this as parameter
        let callbackParam = this.actions.straightDamage && this.actions.straightDamage(this);

        callback(callbackParam);
    };


    rand = (max: number, min = 0) => Math.round(Math.random() * (max - min) + min);

    //function to load probabilities.
    getProb = () => Math.random();

}

