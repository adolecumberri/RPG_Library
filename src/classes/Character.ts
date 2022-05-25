
import M from '../constants/messages';
import { IActions, IStats, IVariation } from '../interfaces'
import { isPercentage, percentageToNumber, uniqueID } from '../helper';
import { checkStats } from '../helper/errorControllers';

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
    };

    [x: string]: any
    constructor(initConfig?: ICharacter) {

        let { stats } = initConfig || {};
        this.stats = !stats ? this.stats : {
            ...this.stats,
            ...stats,
            currentHp: stats?.currentHp ? stats.currentHp :
                stats?.hp ? stats.hp : 0
        };

        this.checkErrors();
        
    }

    rand = (max: number, min = 0) => Math.round(Math.random() * (max - min) + min);

    //function to load probabilities.
    getProb = () => Math.random();

    checkErrors = () =>{
        checkStats(this.stast);
    }
}

export default Character;