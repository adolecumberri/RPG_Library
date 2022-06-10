import  {  checkAccuracy, checkAttack, checkAtt_interval, checkAtt_speed, checkCrit, checkCrit_damage, checkCurrent_hp, checkDefence, checkEvasion,  checkHp, checkStatsBounds } from '../helper/errorControllers'

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
            defence: 0,
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
            defence: 12321332,
            evasion: 1,
            hp: 242322,
        },
        wrong_lower_accuracy: -11,
        wrong_higher_accuracy: 12,
        wrong_attack: -1,
        wrong_att_interval: -1,
        wrong_att_speed: -1,
        wrong_lower_crit: -21,
        wrong_higher_crit: 2,
        wrong_crit_damage: 0,
        wrong_current_hp: -41,
        wrong_defence: null,
        wrong_lower_evasion: -2,
        wrong_higher_evasion: 15,
        wrong_hp: -481,
    }

    it('check all stats and works', () => {
        expect(checkStatsBounds(stast.correct_basic_stats)).toBeUndefined()
    })

    it('check all high stats and works', () => {
        expect(checkStatsBounds(stast.correct_high_stats)).toBeUndefined()
    })

    it( 'checkAccuracy Works', () => {
        expect(checkAccuracy(0.5)).toBeUndefined()
    })

    it( 'low Accuracy fails', () => {
        expect(()=>checkAccuracy(stast.wrong_lower_accuracy)).toThrowError(Error)
    })

    it( 'high Accuracy fails', () => {
        expect(()=>checkAccuracy(stast.wrong_higher_accuracy)).toThrowError(Error)
    })

 
})