import M from "../constants/messages";
import { IStats } from "../interfaces";


const checkStats = (stats: IStats) => {

    // true === error.
    // false === correct
    const CHECKS = {
        accuracy: {
            isWrong: (value: number) => value < 0 || value > 1,
            errorMessage: M.errors.out_of_bounds.between_one_and_zero('accuracy')
        },
        attack: {
            isWrong: (value: number) => value < 1,
            errorMessage: M.errors.out_of_bounds.lower_than_one('attack')
        },
        att_interval: { //bigger === lower
            isWrong: (value: number) => value < 1,
            errorMessage: M.errors.out_of_bounds.lower_than_one('Attack Interval')
        },
        att_speed: { // bigger === faster
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
        deffence: {
            isWrong: (value: number) => !isNaN(value),
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


    for (const key in stats) {
        if (CHECKS[key]) {
            if (CHECKS[key].isWrong(stats[key])) {
                throw new Error(CHECKS[key].errorMessage)
            }
        }
    }

}


export {
    checkStats
}