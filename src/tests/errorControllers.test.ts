import {
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
} from '../helper/errorControllers'

describe('Stats Checker', () => {
    const stast = {
        correct_basic_stats: {
            accuracy: 1,
            attack: 1,
            attack_interval: 1,
            attack_speed: 1,
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
            attack_interval: 8781,
            attack_speed: 987871,
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
        wrong_attack_interval: -1,
        wrong_attack_speed: -1,
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

    describe('Accuracy checks', () => {
        it('checkAccuracy Works', () => {
            expect(checkAccuracy(0.5)).toBeUndefined()
        })

        it('low Accuracy fails', () => {
            expect(() => checkAccuracy(stast.wrong_lower_accuracy)).toThrowError(Error)
        })

        it('high Accuracy fails', () => {
            expect(() => checkAccuracy(stast.wrong_higher_accuracy)).toThrowError(Error)
        })
    })

    describe('Attack checks', () => {
        it('checkAttack Works', () => {
            expect(checkAttack(1.5)).toBeUndefined()
        })

        it('wrong Attack fails', () => {
            expect(() => checkAttack(stast.wrong_attack)).toThrowError(Error)
        })
    })

    describe('Attack Interval checks', () => {
        it('checkAttack_interval Works', () => {
            expect(checkAttack_interval(3)).toBeUndefined()
        })

        it('wrong Attack fails', () => {
            expect(() => checkAttack_interval(stast.wrong_attack_interval)).toThrowError(Error)
        })
    })

    describe('Attack Speed checks', () => {
        it('checkAttack_speed Works', () => {
            expect(checkAttack_speed(3)).toBeUndefined()
        })

        it('wrong Attack fails', () => {
            expect(() => checkAttack_speed(stast.wrong_attack_speed)).toThrowError(Error)
        })
    })

    describe('Crit ratio multiplier checks', () => {
        it('Crit ratio Works', () => {
            expect(checkCrit(0.5)).toBeUndefined()
        })

        it('wrong lower Attack fails', () => {
            expect(() => checkCrit(stast.wrong_lower_crit)).toThrowError(Error)
        })

        it('wrong higher Attack fails', () => {
            expect(() => checkCrit(stast.wrong_higher_crit)).toThrowError(Error)
        })
    })

    describe('Crit damage checks', () => {
        it('Crit damage Works', () => {
            expect(checkCrit_damage(2)).toBeUndefined()
        })

        it(' Crit damage fails', () => {
            expect(() => checkCrit_damage(stast.wrong_crit_damage)).toThrowError(Error)
        })
    })

    describe('check Curren hp checks', () => {
        it('check Curren hp Works', () => {
            expect(checkCurrent_hp(100)).toBeUndefined()
        })

        it('check Curren hp fails', () => {
            expect(() => checkCurrent_hp(stast.wrong_current_hp)).toThrowError(Error)
        })
    })

    describe('check Defence checks', () => {
        it('check Defence Works', () => {
            expect(checkDefence(100)).toBeUndefined()
        })

        it('check Defence fails', () => {
            expect(() => checkDefence(stast.wrong_defence)).toThrowError(Error)
        })
    })

    describe('check Evasion checks', () => {
        it('check Evasion Works', () => {
            expect(checkEvasion(0.8)).toBeUndefined()
        })

        it('check low Evasion fails', () => {
            expect(() => checkEvasion(stast.wrong_lower_evasion)).toThrowError(Error)
        })

        it('check high Evasion fails', () => {
            expect(() => checkEvasion(stast.wrong_higher_evasion)).toThrowError(Error)
        })
    })

    describe('check hp checks', () => {
        it('check hp Works', () => {
            expect(checkHp(1)).toBeUndefined()
        })

        it('check hp fails', () => {
            expect(() => checkHp(stast.wrong_hp)).toThrowError(Error)
        })
    })

})
