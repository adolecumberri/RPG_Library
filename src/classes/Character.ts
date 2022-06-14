
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
        currentHp: 0,
        hp: 0,
        crit: 0,

    };

    id: number

    constructor(initConfig?: ICharacter) {

        let { stats, id } = initConfig || {};
        this.stats = !stats ? this.stats : {
            ...this.stats,
            ...stats,
            currentHp: stats?.currentHp ? stats.currentHp :
                stats?.hp ? stats.hp : 0
        };

        this.id = id ? id : uniqueID();

        this.checkErrors();
        
    }

    attack (
        callback?: (attackObject: IDamageObject, character: Character) => number
    ) {
        let solution: IDamageObject = {
            value: 0,
            type: 'normal'
        }

        let { accuracy, crit, critDamage, attack } = this.stats;

        // let { maxVar, minVar } = this.loadVariation();
        
        //does he hit?
        if (accuracy > this.getProb()) {
            //critical
            if (crit > this.getProb()) {
                solution.value = this.rand(attack * critDamage, attack * critDamage);
                solution.type = 'critical';
            } else {
                // normal hit
                solution.value = this.rand(attack, attack);
            }
        } else {
            // miss
            solution.type = 'miss';
        }

        //if action.attack execute it as this as parameter
        // let callbackParam = this.actions.attack && this.actions.attack(this);

        callback && callback(solution, this);

        return solution;
    };

    rand = (max: number, min = 0) => Math.round(Math.random() * (max - min) + min);

    //function to load probabilities.
    getProb = () => Math.random();

    checkErrors:()=> void = () =>{
        checkStatsBounds(this.stats);
    }

}

export default Character;