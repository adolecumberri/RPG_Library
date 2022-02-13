"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = __importDefault(require("../../constants/messages"));
const utils_1 = require("../../utils");
// import { StatsManager } from './fightStatsManager';
//TODOS: add Spells.
//TODO: add Status manadgement.
//TODO: 
// * @param {type}   var           Description.
// * @param {type}   [var]         Description of optional variable.
// * @param {type}   [var=default] Description of optional variable with default variable.
// * @param {Object} objectVar     Description.
// * @param {type}   objectVar.key Description of a key in the objectVar parameter.
// * @return {any}   ejemplo de return.
/**
 * @param   id              id.
 * @param   stats           Description.
 * @param   variation       Description.
 */
class Character {
    constructor(_a) {
        var { actions, deffenceFunction, id, minDamage = 0, stats, variation = 0 } = _a, args = __rest(_a, ["actions", "deffenceFunction", "id", "minDamage", "stats", "variation"]);
        this.alive = true;
        //! calcula el coeficiente de defensa, que despues multiplica la defesa de this.stats.
        this.deffenceFunction = (damage, character) => {
            //load final damage. (damage - deffence.)
            let finalDamage = damage - (character === null || character === void 0 ? void 0 : character.stats.deffence);
            //if finalDamage lower than minDamage, I send minDamage.
            return finalDamage < (character === null || character === void 0 ? void 0 : character.minDamage) ? character === null || character === void 0 ? void 0 : character.minDamage : finalDamage;
        };
        this.kills = 0;
        this.stats = {
            accuracy: 1,
            attack: 1,
            att_interval: 0,
            att_speed: 0,
            crit: 0,
            critDamage: 1,
            currentHp: 0,
            deffence: 0,
            evasion: 0,
            hp: 0,
        }; //Todo: apply
        this.variation = 0; //Todo: apply
        this.setMinDamage = (minDamage) => {
            this.checkMinDamage(minDamage);
            this.minDamage = minDamage;
        };
        /**
         * set variation checking if it's a correct value.
         * @param {number | IVariation} newVariation
         */
        this.setVariation = (newVariation) => {
            this.checkVariationError(newVariation);
            this.variation = newVariation;
        };
        this.rand = (max, min = 0) => Math.round(Math.random() * (max - min) + min);
        //function to load probabilities.
        this.getProb = () => Math.random();
        this.checkMinDamage = (minDamage) => {
            if (minDamage < 0) {
                throw new Error(messages_1.default.min_damage_negative);
            }
        };
        this.checkStatsLogic = (stats) => {
            if (stats.accuracy === 0 || stats.accuracy < 0) {
                throw new Error(messages_1.default.accuracy_zero);
            }
            if (stats.evasion > 1 || stats.evasion < 0) {
                throw new Error(messages_1.default.evasion_out_of_bounds);
            }
            if (stats.crit > 1 || stats.crit < 0) {
                throw new Error(messages_1.default.crit_out_of_bounds);
            }
        };
        //added this.stats default values AND stats from props.
        this.stats = !stats ? this.stats : Object.assign(Object.assign(Object.assign({}, this.stats), stats), { currentHp: (stats === null || stats === void 0 ? void 0 : stats.currentHp) ?
                stats.currentHp :
                (stats === null || stats === void 0 ? void 0 : stats.hp) ?
                    stats.hp : 0 });
        //check arguments AND stats mixed with default Stats.
        this.checkInitialErrors({
            actions,
            id,
            minDamage,
            stats: this.stats,
            variation,
        });
        this.id = id ? id : (0, utils_1.uniqueID)();
        this.actions = actions ? actions : {};
        this.minDamage = minDamage;
        this.variation = variation;
        this.deffenceFunction = deffenceFunction ? deffenceFunction : this.deffenceFunction;
        //adding ...args to this.
        const keys = Object.keys(args);
        keys.forEach((key, index) => {
            this[key] = args[key];
        });
    }
    addKill(callback) {
        //kill added.
        this.kills++;
        //if action.addkill execute it as this as parameter
        let callbackParam = this.actions.addKill && this.actions.addKill(this);
        callback(callbackParam);
    }
    ;
    addHp(hpAdded) {
        if ((0, utils_1.isPercentage)(hpAdded)) {
            this.currentHp += this.hp * (0, utils_1.percentageToNumber)(hpAdded);
        }
        else {
            this.currentHp += hpAdded;
        }
        //Over healed?
        if (this.currentHp > this.hp) {
            this.currentHp = this.hp;
        }
        return this.currentHp;
    }
    attack(callback) {
        let { accuracy, crit, critDamage, attack } = this.stats;
        let { maxVar, minVar } = this.loadVariation();
        let damage = 0;
        if (accuracy > this.getProb()) {
            //does he hit?
            if (crit > this.getProb()) {
                //critical
                damage = this.rand(attack * (critDamage + 1) * maxVar, attack * (critDamage + 1) * minVar);
            }
            else {
                // normal hit
                damage = this.rand(attack * maxVar, attack * minVar);
            }
        }
        else {
            // miss
        }
        //if action.attack execute it as this as parameter
        let callbackParam = this.actions.attack && this.actions.attack(this);
        callback(callbackParam);
        return damage;
    }
    ;
    /**
     * Recomended for fights where the faster attacks.
     * I use a variable called "current_att_interval" where I addition the "att_interval"
     * the biggest att_interval, the slowest the character attack.
     * ex: you attack in the interval 10, so you add 10 again (20 in total). And in the fight you wait untli turn 20 to hit again.
     * @param callback
     */
    calcNextTurn(callback) {
        if (this.stats.att_speed <= 0) {
            throw new Error(messages_1.default.attack_speed_negative);
        }
        //if action.calcNextTurn execute it as this as parameter
        let callbackParam = this.actions.calcNextTurn && this.actions.calcNextTurn(this);
        callback(callbackParam);
    }
    ;
    defend(damage, callback) {
        let { evasion } = this.stats;
        let damageDone = 0;
        //does he evade?
        if (evasion <= this.getProb()) {
            damageDone = this.deffenceFunction(damage, this);
        }
        else {
            //attack evaded
        }
        //if action.defend execute it as this as parameter
        let callbackParam = this.actions.defend && this.actions.defend(this);
        callback(callbackParam);
        return damageDone;
    }
    ;
    dies(callback) {
        this.alive = false;
        this.stats.currentHp = 0;
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
    loadVariation() {
        var _a, _b;
        let minVar = 1;
        let maxVar = 1;
        if (typeof this.variation === "number") {
            minVar -= this.variation;
            maxVar += this.variation;
        }
        else if (this.variattion.discriminator === "IVariation") {
            minVar -= (_a = this.variation) === null || _a === void 0 ? void 0 : _a.minVariation;
            maxVar += (_b = this.variation) === null || _b === void 0 ? void 0 : _b.maxVariation;
        }
        return { maxVar, minVar };
    }
    revive(callback) {
        this.alive = true;
        this.stats.currentHp = this.stats.hp;
        //if action.revive execute it as this as parameter
        let callbackParam = this.actions.revive && this.actions.revive(this);
        callback(callbackParam);
    }
    ;
    removeHp(hpRemoved) {
        if ((0, utils_1.isPercentage)(hpRemoved)) {
            this.currentHp -= this.hp * (0, utils_1.percentageToNumber)(hpRemoved);
        }
        else {
            this.currentHp -= hpRemoved;
        }
        //is dead?
        if (this.currentHp < 0) {
            this.currentHp = 0;
        }
        return this.currentHp;
    }
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
    //TODO: daño directo.    
    straightDamage(damage, callback) {
        //TODO: check if parseFloat fails when it's a number.
        if (damage === 0 || parseFloat(damage) === 0) {
            throw new Error(messages_1.default.damageZero);
        }
        if ((0, utils_1.isPercentage)(damage)) {
            // percentage to number. Calculated the percentage coeficient. Loaded Life lost and Loaded newHp
            let newHp = this.stats.currentHp - (this.stats.currentHp * (0, utils_1.percentageToNumber)(damage));
            // if hp is under 0, it's set to 0.
            this.stats.currentHp = newHp > 0 ? newHp : 0;
        }
        else {
            //TODO: damage straight to the hp.
        }
        //TODO: morir automaticamente?
        //if action.startTurn execute it as this as parameter
        let callbackParam = this.actions.straightDamage && this.actions.straightDamage(this);
        callback(callbackParam);
    }
    ;
    checkVariationError(variation) {
        //variation logic
        if (typeof variation === "number") {
            if (variation > 1 || variation < 0) {
                throw new Error(messages_1.default.variation_out_of_bounds);
            }
        }
        else if (typeof variation === "object") {
            if (variation.maxVariation < variation.minVariation) {
                throw new Error(messages_1.default.max_lower_than_min);
            }
            if (variation.maxVariation < 0) {
                throw new Error(messages_1.default.max_variation_out_of_bounds);
            }
            if (variation.minVariation > 1 || variation.minVariation < 0) {
                throw new Error(messages_1.default.min_variation_out_of_bounds);
            }
        }
    }
    checkInitialErrors({ id, stats, variation, actions, minDamage }) {
        //id logic
        if (typeof id === "string" || typeof id === "number") {
            throw new Error(messages_1.default.wrong_id_type);
        }
        //minDamage logic
        this.checkMinDamage(minDamage);
        //TODO: stats logic.
        this.checkStatsLogic(stats);
    }
}
exports.default = Character;
