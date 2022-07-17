
import M from '../constants/messages';
import { IActions, IStats } from '../interfaces'
import { isPercentage, percentageToNumber, uniqueID } from '../helper';
import { checkStatsBounds } from '../helper/errorControllers';
import discriminators from '../constants/discriminators';
import { IAttackObject, IDefenceObject } from '../interfaces/Common.interface';
import { DEFAULT_ATTACK_OBJECT, DEFAULT_DEFENCE_OBJECT } from '../constants/defaults';


// * @param {type}   var           Description.
// * @param {type}   [var]         Description of optional variable.
// * @param {type}   [var=default] Description of optional variable with default variable.
// * @param {Object} objectVar     Description.
// * @param {type}   objectVar.key Description of a key in the objectVar parameter.
// * @return {any}   ejemplo de return.

type ICharacter = {
    constructorStats?: Partial<IStats>
    id?: number
    defenceFunction?: (...args: any[]) => IDefenceObject
}

class Character {

    actions: IActions;

    defenceFunction = (attackObject: IAttackObject) => {
        //default defence object
        let defenceObject = { ...DEFAULT_DEFENCE_OBJECT }

        //calculated damage after defence is substracted
        defenceObject.value = attackObject.value - this.stats.defence

        //if min_damage is set AND damage dealt is lower than min_damage, damage dealt = min_damage
        if (this.min_damage_dealt && defenceObject.value <= Number(this.min_damage_dealt))
            defenceObject.value = this.min_damage_dealt

        return defenceObject
    }

    discriminator = discriminators['CHARACTER']

    isAlive: boolean = true;

    min_damage_dealt: number

    stats: Partial<IStats> = {
        accuracy: 1,
        attack: 1,
        current_hp: 0,
        hp: 0,
        crit: 0,
        crit_multiplier: 1

    };

    id: number

    constructor(initConfig?: ICharacter) {

        let { constructorStats, id, defenceFunction } = initConfig || {};
        this.stats = !constructorStats ? this.stats : {
            ...this.stats,
            ...constructorStats,
            current_hp: constructorStats?.current_hp ? constructorStats.current_hp :
                constructorStats?.hp ? constructorStats.hp : 0
        };

        this.id = id ? id : uniqueID();

        this.checkErrors();

    }

    /**
     * @param callback 
     * Calculates attacks. 
     * is Missing? attack = 0. 
     * is Critical? attack * crit_multiplier. 
     * normal attack? attack returned. 
     * @returns Damage Object
     */
    attack(
        callback?: (attackObject?: IAttackObject, character?: Character) => void
    ) {
        let solution: IAttackObject = {
            discriminator: discriminators.ATTACK_OBJECT,
            value: 0,
            type: 'normal'
        }

        let { accuracy, crit, crit_multiplier, attack } = this.stats;

        //does he hit?
        if (accuracy < this.getProb()) {
            // miss
            solution.type = 'miss';
        } else if (crit > this.getProb()) {
            //critical
            solution.value = attack * crit_multiplier;
            solution.type = 'critical';
        } else {
            // normal hit
            solution.value = attack;
        }

        callback && callback(solution, this);
        return solution;
    };

    defend(
        data: IAttackObject,
        callback?: (attackObject: IAttackObject, defenceObject: IDefenceObject, character?: Character) => void
    ) {
        //execute the defence function
        let solution =  this.defenceFunction(data)

        //calls callback if passed
        callback && callback(data, solution, this)

        //returns DefenceObject
        return solution;
    }


    rand = (max: number, min = 0) => Math.round(Math.random() * (max - min) + min);

    //function to load probabilities.
    getProb = () => Math.random();

    checkErrors: () => void = () => {
        checkStatsBounds(this.stats);
    }

}

export default Character;