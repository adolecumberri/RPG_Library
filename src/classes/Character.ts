
import M from '../constants/messages';
import { IActions, IDamageObject, IStats, IVariation } from '../interfaces'
import { isPercentage, percentageToNumber, uniqueID } from '../helper';
import { checkStatsBounds } from '../helper/errorControllers';
import discriminators from '../constants/discriminators';


// * @param {type}   var           Description.
// * @param {type}   [var]         Description of optional variable.
// * @param {type}   [var=default] Description of optional variable with default variable.
// * @param {Object} objectVar     Description.
// * @param {type}   objectVar.key Description of a key in the objectVar parameter.
// * @return {any}   ejemplo de return.

type ICharacter = {
    constructorStats?: Partial<IStats>
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

    discriminator = discriminators['CHARACTER']

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

        let { constructorStats, id } = initConfig || {};
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
        callback?: (attackObject?: IDamageObject, character?: Character) => void
    ) {
        let solution: IDamageObject = {
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

    defend: (data: any) => any = (enemi) => {
        // let { id, hp, currentHp, name, surname, def, evasion } = this.stats;
        // let finalDamage = 0;

        // if (evasion <= this.getProb()) {
        // 	//Evade o no.
        // 	let enemiAttack = enemi.attack();
        // 	let attMultiplier = 40 / (40 + def);
        // 	finalDamage = Math.round(enemiAttack * attMultiplier);

        // 	//Stats
        // 	enemi.fightStats.set('total_damage', enemi.fightStats.get('total_damage') + finalDamage);
        // 	this.fightStats.addHitReceived();
        // } else {
        // 	enemi.calcNextTurn(enemi.heroEfects.att_interval);

        // 	//stats
        // 	this.fightStats.addEvasion();
        // }

        // this.heroStats.currentHp = currentHp - finalDamage >= 0 ? currentHp - finalDamage : 0; //
        // //stats
        // this.fightStats.set('currhp', this.heroStats.currentHp);
        // if (this.heroStats.currentHp === 0) {
        // 	this.isDead = true;
        // }
    };


    rand = (max: number, min = 0) => Math.round(Math.random() * (max - min) + min);

    //function to load probabilities.
    getProb = () => Math.random();

    checkErrors: () => void = () => {
        checkStatsBounds(this.stats);
    }

}

export default Character;