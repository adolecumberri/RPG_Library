import { IStats } from "../interfaces"

const TESTING_STATS = {
    correct_basic_stats: {
        accuracy: 1,
        attack: 1,
        attack_interval: 1,
        attack_speed: 1,
        crit: 0,
        crit_multiplier: 1,
        current_hp: 0,
        defence: 0,
        evasion: 0,
        hp: 0,
    } as IStats,
    correct_high_stats: {
        accuracy: 0.89,
        attack: 1545454,
        attack_interval: 8781,
        attack_speed: 987871,
        crit: 1,
        crit_multiplier: 1242431,
        current_hp: 1223232,
        defence: 12321332,
        evasion: 1,
        hp: 242322,
    } as IStats,
    wrong_lower_accuracy: -11,
    wrong_higher_accuracy: 12,
    wrong_attack: -1,
    wrong_attack_interval: -1,
    wrong_attack_speed: -1,
    wrong_lower_crit: -21,
    wrong_higher_crit: 2,
    wrong_crit_multiplier: 0,
    wrong_current_hp: -41,
    wrong_defence: null,
    wrong_lower_evasion: -2,
    wrong_higher_evasion: 15,
    wrong_hp: -481,
}

export {
    TESTING_STATS
}