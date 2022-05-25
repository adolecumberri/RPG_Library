
import M from '../constants/messages';
import { IActions, ICharacterConstructor, IStats, IVariation } from '../interfaces'
import { isPercentage, percentageToNumber, uniqueID } from '../helper';

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

    actions: IActions;

    alive: boolean = true;

    [x: string]: any
    constructor() {

    }

    rand = (max: number, min = 0) => Math.round(Math.random() * (max - min) + min);

    //function to load probabilities.
    getProb = () => Math.random();

}

export default Character;