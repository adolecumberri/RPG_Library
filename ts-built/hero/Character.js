"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
const utils_1 = require("./../utils");
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
class Character {
    constructor({ id, stats, variation, actions }) {
        this.stats = {
            accuracy: 1,
            attack: 0,
            crit: 0,
            critDamage: 1,
            evasion: 0,
            hp: 0,
        }; //Todo: apply
        this.rand = (max, min = 0) => Math.round(Math.random() * (max - min) + min);
        //function to load probabilities.
        this.getProb = () => Math.random();
        this.id = id ? id : (0, utils_1.uniqueID)();
        this.stats = stats;
        this.variation = variation;
        this.actions = actions;
    }
    addKill(callback) {
        //if action.addkill execute it as this as parameter
        let callbackParam = this.actions.addKill && this.actions.addKill(this);
        callback(callbackParam);
    }
    ;
    attack(callback) {
        //if action.attack execute it as this as parameter
        let callbackParam = this.actions.attack && this.actions.attack(this);
        callback(callbackParam);
    }
    ;
    //TODO: control attack_speed > 0.
    calcNextTurn(callback) {
        //if action.calcNextTurn execute it as this as parameter
        let callbackParam = this.actions.calcNextTurn && this.actions.calcNextTurn(this);
        callback(callbackParam);
    }
    ;
    defend(callback) {
        //if action.defend execute it as this as parameter
        let callbackParam = this.actions.defend && this.actions.defend(this);
        callback(callbackParam);
    }
    ;
    //HERO DIES
    dies(callback) {
        //if action.dies execute it as this as parameter
        let callbackParam = this.actions.dies && this.actions.dies(this);
        callback(callbackParam);
    }
    ;
    endFight(callback) {
        //if action.endFight execute it as this as parameter
        let callbackParam = this.actions.endFight && this.actions.endFight(this);
        callback(callbackParam);
    }
    ;
    endTurn(callback) {
        //if action.endTurn execute it as this as parameter
        let callbackParam = this.actions.endTurn && this.actions.endTurn(this);
        callback(callbackParam);
    }
    ;
    revive(callback) {
        //if action.revive execute it as this as parameter
        let callbackParam = this.actions.revive && this.actions.revive(this);
        callback(callbackParam);
    }
    ;
    startFight(callback) {
        //if action.startFight execute it as this as parameter
        let callbackParam = this.actions.startFight && this.actions.startFight(this);
        callback(callbackParam);
    }
    ;
    startTurn(callback) {
        //if action.startTurn execute it as this as parameter
        let callbackParam = this.actions.startTurn && this.actions.startTurn(this);
        callback(callbackParam);
    }
    ;
    //daño directo sin pasar por armadura
    straightDamage(callback) {
        //if action.startTurn execute it as this as parameter
        let callbackParam = this.actions.straightDamage && this.actions.straightDamage(this);
        callback(callbackParam);
    }
    ;
}
exports.Character = Character;
