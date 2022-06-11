import M from "../constants/messages";
import { IStats } from "../interfaces";

interface IChecks {
    [x: keyof IStats]: {
        isWrong: (value: any) => boolean,
        errorMessage: string
    }
}

const CHECKS: IChecks = {
    accuracy: {
        isWrong: (value: number) => value < 0 || value > 1,
        errorMessage: M.errors.out_of_bounds.between_one_and_zero('accuracy')
    },
    attack: {
        isWrong: (value: number) => value < 1,
        errorMessage: M.errors.out_of_bounds.lower_than_one('attack')
    },
    attack_interval: { //bigger === lower
        isWrong: (value: number) => value < 1,
        errorMessage: M.errors.out_of_bounds.lower_than_one('Attack Interval')
    },
    attack_speed: { // bigger === faster
        isWrong: (value: number) => value < 1,
        errorMessage: M.errors.out_of_bounds.lower_than_one('Attack Speed')
    },
    crit: {
        isWrong: (value: number) => value < 0 || value > 1,
        errorMessage: M.errors.out_of_bounds.between_one_and_zero('crit')
    },
    crit_damage: {
        isWrong: (value: number) => value < 1,
        errorMessage: M.errors.out_of_bounds.lower_than_one('Critical Damage')
    },
    current_hp: {
        isWrong: (value: number) => value < 0,
        errorMessage: M.errors.out_of_bounds.lower_than_zero('Current HP')
    },
    defence: {
        isWrong: (value: number) => isNaN(parseInt(value as unknown as string)),
        errorMessage: ''
    },
    evasion: {
        isWrong: (value: number) => value < 0 || value > 1,
        errorMessage: M.errors.out_of_bounds.between_one_and_zero('evasion')
    },
    hp: {
        isWrong: (value: number) => value < 0,
        errorMessage: M.errors.out_of_bounds.lower_than_zero('HP')
    }
}

const checkAccuracy = (val: number) => {
  if ( CHECKS.accuracy.isWrong(val) ) throw new Error(CHECKS.accuracy.errorMessage)
}
const checkAttack = (val: number) => {
    if ( CHECKS.attack.isWrong(val) ) throw new Error(CHECKS.attack.errorMessage)
}
const checkAttack_interval = (val: number) => {
    if ( CHECKS.attack_interval.isWrong(val) ) throw new Error(CHECKS.att_interval.errorMessage)
}
const checkAttack_speed = (val: number) => {
    if ( CHECKS.attack_speed.isWrong(val) ) throw new Error(CHECKS.attack_speed.errorMessage)
}
const checkCrit = (val: number) => {
    if ( CHECKS.crit.isWrong(val) ) throw new Error(CHECKS.crit.errorMessage)
}
const checkCrit_damage = (val: number) => {
    if ( CHECKS.crit_damage.isWrong(val) ) throw new Error(CHECKS.crit_damage.errorMessage)
}
const checkCurrent_hp = (val: number) => {
    if ( CHECKS.current_hp.isWrong(val) ) throw new Error(CHECKS.current_hp.errorMessage)
}
const checkDefence = (val: number) => {
    if ( CHECKS.defence.isWrong(val) ) throw new Error(CHECKS.defence.errorMessage)
}
const checkEvasion = (val: number) => {
    if ( CHECKS.evasion.isWrong(val) ) throw new Error(CHECKS.evasion.errorMessage)
}
const checkHp = (val: number) => {
    if ( CHECKS.hp.isWrong(val) ) throw new Error(CHECKS.hp.errorMessage)
}

const checkStatsBounds = (stats: IStats) => {
    // true === error.
    // false === correct
  
    for (const key in stats) {
        if (CHECKS[key]) {
            if (CHECKS[key].isWrong(stats[key])) {
                console.log({
                    key,
                    message: CHECKS[key].errorMessage
                })
                throw new Error(CHECKS[key].errorMessage)
            }
        }
    }

}


export {
    checkAccuracy,
    checkAttack,
    checkAttack_interval,
    checkAttack_speed,
    checkCrit,
    checkCrit_damage,
    checkCurrent_hp,
    checkDefence,
    checkEvasion, 
    checkHp,
    checkStatsBounds
}