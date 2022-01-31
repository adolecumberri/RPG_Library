
import M from '../../constants/messages';
import { IActions, ICharacterConstructor, IStats, IVariation } from '../../interfaces'
import { isPercentage, percentageToNumber, uniqueID } from '../../utils';

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
export class Character {

    actions: IActions;

    alive: boolean = true;

    //! calcula el coeficiente de defensa, que despues multiplica la defesa de this.stats.
    deffenceFunction: (damage: number, character?: Character) => number = (damage, character) => {
        //load final damage. (damage - deffence.)
        let finalDamage = damage - (character?.stats.deffence as number);

        //if finalDamage lower than minDamage, I send minDamage.
        return finalDamage < (character?.minDamage as number) ? (character?.minDamage as number) : finalDamage;
    };

    id: number | string;

    kills: number = 0;

    //min damage able to receibe.
    minDamage: number;

    stats: IStats = {
        accuracy: 1,
        attack: 0,
        att_interval: 0,
        att_speed: 0,
        crit: 0,
        critDamage: 1,
        currentHp: 0,
        deffence: 0,
        evasion: 0,
        hp: 0,
    }; //Todo: apply

    variation: number | IVariation = 0; //Todo: apply

    //!unused
    // spells: { [x: string]: Spell } = {}

    //TODO: Status
    status: any;

    [x: string]: any
    constructor({
        actions,
        deffenceFunction,
        id,
        minDamage = 0,
        stats,
        variation = 0,
        ...args
    }: IStats) {

        //added this.stats default values AND stats from props.
        this.stats = !stats ? this.stats : {
            ...this.stats, ...stats,
            currentHp: stats?.currentHp ?
                stats.currentHp :
                stats?.hp ?
                    stats.hp : 0
        };

        //check arguments AND stats mixed with default Stats.
        this.checkInitialErrors({
            actions,
            id,
            minDamage,
            stats: this.stats,
            variation,
        });

        this.id = id ? id : uniqueID();

        this.actions = actions;
        this.minDamage = minDamage;
        this.variation = variation;
        this.deffenceFunction = deffenceFunction ? deffenceFunction : this.deffenceFunction;

        //adding ...args to this.
        const keys = Object.keys(args);
        keys.forEach((key, index) => {
            this[key] = args[key];
        });
    }

    addKill(callback: (action_addKill_return?: any) => void) {
        //kill added.
        this.kills++;

        //if action.addkill execute it as this as parameter
        let callbackParam = this.actions.addKill && this.actions.addKill(this);

        callback(callbackParam);
    };

    addHp(hpAdded: number | string): number {
        if (isPercentage(hpAdded)) {
            this.currentHp += this.hp * percentageToNumber(hpAdded as string);
        } else {
            this.currentHp += hpAdded as number;
        }

        //Over healed?
        if (this.currentHp > this.hp) {
            this.currentHp = this.hp;
        }

        return this.currentHp;

    }

    attack(callback: (action_attack_return?: any) => number) {
        let { accuracy, crit, critDamage, attack } = this.stats;

        let { maxVar, minVar } = this.loadVariation();

        let damage = 0;

        if (accuracy > this.getProb()) {
            //does he hit?
            if (crit > this.getProb()) {
                //critical
                damage = this.rand(attack * (critDamage + 1) * maxVar, attack * (critDamage + 1) * minVar);
            } else {
                // normal hit
                damage = this.rand(attack * maxVar, attack * minVar);
            }
        } else {
            // miss
        }

        //if action.attack execute it as this as parameter
        let callbackParam = this.actions.attack && this.actions.attack(this);

        callback(callbackParam);

        return damage;
    };

    /**
     * Recomended for fights where the faster attacks.
     * I use a variable called "current_att_interval" where I addition the "att_interval"
     * the biggest att_interval, the slowest the character attack.
     * ex: you attack in the interval 10, so you add 10 again (20 in total). And in the fight you wait untli turn 20 to hit again.
     * @param callback 
     */
    calcNextTurn(callback: (action_calcNextTurn_return?: any) => void) {
        if (this.stats.att_speed as number <= 0) {
            throw new Error(M.attack_speed_negative);
        }

        //if action.calcNextTurn execute it as this as parameter
        let callbackParam = this.actions.calcNextTurn && this.actions.calcNextTurn(this);

        callback(callbackParam);
    };


    defend(damage: number, callback: (action_defend_return?: any) => void) {

        let { evasion } = this.stats;
        let damageDone = 0;

        //does he evade?
        if (evasion <= this.getProb()) {
            damageDone = this.deffenceFunction(damage, this);
        } else {
            //attack evaded
        }

        //if action.defend execute it as this as parameter
        let callbackParam = this.actions.defend && this.actions.defend(this);

        callback(callbackParam);

        return damageDone;
    };

    dies(callback: (action_dies_return?: any) => void) {

        this.alive = false;
        this.stats.currentHp = 0;

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

    loadVariation() {
        let minVar = 1;
        let maxVar = 1;
        if (typeof this.variation === "number") {
            minVar -= this.variation;
            maxVar += this.variation;
        } else if (this.variattion.discriminator === "IVariation") {
            minVar -= this.variation?.minVariation as number;
            maxVar += this.variation?.maxVariation as number;
        }

        return { maxVar, minVar }
    }

    revive(callback: (action_revive_return?: any) => void) {

        this.alive = true;
        this.stats.currentHp = this.stats.hp;

        //if action.revive execute it as this as parameter
        let callbackParam = this.actions.revive && this.actions.revive(this);

        callback(callbackParam);
    };

    removeHp(hpRemoved: number | string): number {
        if (isPercentage(hpRemoved)) {
            this.currentHp -= this.hp * percentageToNumber(hpRemoved as string);
        } else {
            this.currentHp -= hpRemoved as number;
        }

        //is dead?
        if (this.currentHp < 0) {
            this.currentHp = 0;
        }

        return this.currentHp;
    }


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

    //TODO: daño directo.    
    straightDamage(damage: number | string, callback: (action_straightDamage_return?: any) => void) {

        //TODO: check if parseFloat fails when it's a number.
        if (damage === 0 || parseFloat(damage as string) === 0) {
            throw new Error(M.damageZero);
        }

        if (isPercentage(damage)) {
            // percentage to number. Calculated the percentage coeficient. Loaded Life lost and Loaded newHp
            let newHp = this.stats.currentHp - (this.stats.currentHp * percentageToNumber(damage as string));
            // if hp is under 0, it's set to 0.
            this.stats.currentHp = newHp > 0 ? newHp : 0;
        } else {
            //TODO: damage straight to the hp.
        }

        //TODO: morir automaticamente?

        //if action.startTurn execute it as this as parameter
        let callbackParam = this.actions.straightDamage && this.actions.straightDamage(this);

        callback(callbackParam);
    };

    setMinDamage = (minDamage: number) => {
        this.checkMinDamage(minDamage);
        this.minDamage = minDamage;
    }

    /**
     * set variation checking if it's a correct value.
     * @param {number | IVariation} newVariation 
     */
    setVariation = (newVariation: number | IVariation) =>{
        this.checkVariationError(newVariation);

        this.variation = newVariation;
    }

    rand = (max: number, min = 0) => Math.round(Math.random() * (max - min) + min);

    //function to load probabilities.
    getProb = () => Math.random();


    checkVariationError(variation: number | IVariation) {

        //variation logic
        if (typeof variation === "number") {
            if (variation > 1 || variation < 0) {
                throw new Error(M.variation_out_of_bounds);
            }
        } else if (typeof variation === "object") {

            if (variation.maxVariation < variation.minVariation) {
                throw new Error(M.max_lower_than_min);
            }

            if (variation.maxVariation < 0) {
                throw new Error(M.max_variation_out_of_bounds);
            }

            if (variation.minVariation > 1 || variation.minVariation < 0) {
                throw new Error(M.min_variation_out_of_bounds);
            }
        }

    }

    

    checkInitialErrors({ id, stats, variation, actions, minDamage }: { stats: IStats, [x: string]: any }) {
        //id logic
        if (typeof id === "string" || typeof id === "number") {
            throw new Error(M.wrong_id_type);
        }

        //minDamage logic
        this.checkMinDamage(minDamage)

        //TODO: stats logic.
        this.checkStatsLogic(stats);
    }

    checkMinDamage = (minDamage: number) => {
        if (minDamage < 0) {
            throw new Error(M.min_damage_negative);
        }
    }

    checkStatsLogic =  (stats: IStats) => {
        if (stats.accuracy === 0 || stats.accuracy < 0) {
            throw new Error(M.accuracy_zero);
        }
        if (stats.evasion > 1 || stats.evasion < 0) {
            throw new Error(M.evasion_out_of_bounds);
        }

        if (stats.crit > 1 || stats.crit < 0) {
            throw new Error(M.crit_out_of_bounds);
        }
    }

}

