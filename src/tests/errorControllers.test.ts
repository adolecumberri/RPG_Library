import { checkStatsBounds } from '../helper/errorControllers'

describe('Stats Checker', () => {
    const stast = {
        correct_basic_stats: {
            accuracy: 1,
            attack: 1,
            att_interval: 1,
            att_speed: 1,
            crit: 0,
            critDamage: 1,
            currentHp: 0,
            deffence: 0,
            evasion: 0,
            hp: 0,
        },
        correct_high_stats: {
            accuracy: 0.89,
            attack: 1545454,
            att_interval: 8781,
            att_speed: 987871,
            crit: 1,
            critDamage: 1242431,
            currentHp: 1223232,
            deffence: 12321332,
            evasion: 1,
            hp: 242322,
        },
        wrong_lower_accuracy: {
            accuracy: -11,
        },
        wrong_higher_accuracy: {
            accuracy: 12,
        },
        wrong_attack: {
            attack: -1,
        },
        wrong_att_interval: {
            att_interval: -1,
        },
        wrong_att_speed: {
            att_speed: -1,
        },
        wrong_lower_crit: { //is a % 0-1
            crit: -21,
        },
        wrong_higher_crit: { // is a % 0-1
            crit: 2,
        },
        wrong_crit_damage: { //crit damage is a multiplier.
            crit_damage: 0,
        },
        wrong_current_hp: {
            current_hp: -41,
        },
        wrong_deffence: {
            deffence: null,
        },
        wrong_lower_evasion: {
            evasion: -2,
        },
        wrong_higher_evasion: {
            evasion: 15,
        },
        wrong_hp: {
            hp: -481,
        }
    }

    
})