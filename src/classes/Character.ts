
import M from '../constants/messages';
import { IActions, IDamageObject, IStats, IVariation } from '../interfaces'
import { isPercentage, percentageToNumber, uniqueID } from '../helper';
import { checkStatsBounds } from '../helper/errorControllers';

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

type ICharacter = {
    stats?: IStats
    id?: number
}

/**
 * @param   id              id.
 * @param   stats           Description.
 * @param   variation       Description.
 */
class Character {

    actions: IActions;

    alive: boolean = true;
    stats: IStats = {
        accuracy: 1,
        attack: 1,
        current_hp: 0,
        hp: 0,
        crit: 0,
        crit_multiplier: 1

    };

    id: number

    constructor(initConfig?: ICharacter) {

        let { stats, id } = initConfig || {};
        this.stats = !stats ? this.stats : {
            ...this.stats,
            ...stats,
            current_hp: stats?.current_hp ? stats.current_hp :
                stats?.hp ? stats.hp : 0
        };

        this.id = id ? id : uniqueID();

        this.checkErrors();

    }

    /**
     * 
     * @param callback 
     * Calculates attacks. 
     * is Missing? attack = 0. 
     * is Critical? attack * crit_multiplier. 
     * normal attack? attack returned. 
     * @returns Damage Object
     */
    attack(
        callback?: (attackObject?: IDamageObject, character?: Character) => void
    ) {
        let solution: IDamageObject = {
            value: 0,
            type: 'normal'
        }

        let { accuracy, crit, crit_multiplier, attack } = this.stats;

        //does he hit?
        if (accuracy < this.getProb()) {
            // miss
            solution.type = 'miss';
        } else {
            //critical
            if (crit > this.getProb()) {
                solution.value = attack * crit_multiplier;
                solution.type = 'critical';
            } else {
                // normal hit
                solution.value = attack;
            }
        }

        callback && callback(solution, this);
        return solution;
    };

    rand = (max: number, min = 0) => Math.round(Math.random() * (max - min) + min);

    //function to load probabilities.
    getProb = () => Math.random();

    checkErrors: () => void = () => {
        checkStatsBounds(this.stats);
    }

}

export default Character;