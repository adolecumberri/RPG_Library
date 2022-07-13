import {
    checkAccuracy,
    checkAttack,
    checkAttack_interval,
    checkAttack_speed,
    checkCrit,
    checkCrit_multiplier,
    checkCurrent_hp,
    checkDefence,
    checkEvasion,
    checkHp,
    checkStatsBounds
} from '../helper/errorControllers'

import { TESTING_STATS as stats} from '../constants/stats'

describe('Stats Checker', () => {

    it('check all stats and works', () => {
        expect(checkStatsBounds(stats.correct_basic_stats)).not.toThrowError()
    })

    it('check all high stats and works', () => {
        expect(checkStatsBounds(stats.correct_high_stats)).not.toThrowError()
    })

    describe('Accuracy checks', () => {
        it('checkAccuracy Works', () => {
            expect(checkAccuracy(0.5)).not.toThrowError()
        })

        it('low Accuracy fails', () => {
            expect(() => checkAccuracy(stats.wrong_lower_accuracy)).toThrowError(Error)
        })

        it('high Accuracy fails', () => {
            expect(() => checkAccuracy(stats.wrong_higher_accuracy)).toThrowError(Error)
        })
    })

    describe('Attack checks', () => {
        it('checkAttack Works', () => {
            expect(checkAttack(1.5)).not.toThrowError()
        })

        it('wrong Attack fails', () => {
            expect(() => checkAttack(stats.wrong_attack)).toThrowError(Error)
        })
    })

    describe('Attack Interval checks', () => {
        it('checkAttack_interval Works', () => {
            expect(checkAttack_interval(3)).not.toThrowError()
        })

        it('wrong Attack fails', () => {
            expect(() => checkAttack_interval(stats.wrong_attack_interval)).toThrowError(Error)
        })
    })

    describe('Attack Speed checks', () => {
        it('checkAttack_speed Works', () => {
            expect(checkAttack_speed(3)).not.toThrowError()
        })

        it('wrong Attack fails', () => {
            expect(() => checkAttack_speed(stats.wrong_attack_speed)).toThrowError(Error)
        })
    })

    describe('Crit ratio multiplier checks', () => {
        it('Crit ratio Works', () => {
            expect(checkCrit(0.5)).not.toThrowError()
        })

        it('wrong lower Attack fails', () => {
            expect(() => checkCrit(stats.wrong_lower_crit)).toThrowError(Error)
        })

        it('wrong higher Attack fails', () => {
            expect(() => checkCrit(stats.wrong_higher_crit)).toThrowError(Error)
        })
    })

    describe('Crit damage checks', () => {
        it('Crit damage Works', () => {
            expect(checkCrit_multiplier(2)).not.toThrowError()
        })

        it(' Crit damage fails', () => {
            expect(() => checkCrit_multiplier(stats.wrong_crit_multiplier)).toThrowError(Error)
        })
    })

    describe('check Curren hp checks', () => {
        it('check Curren hp Works', () => {
            expect(checkCurrent_hp(100)).not.toThrowError()
        })

        it('check Curren hp fails', () => {
            expect(() => checkCurrent_hp(stats.wrong_current_hp)).toThrowError(Error)
        })
    })

    describe('check Defence checks', () => {
        it('check Defence Works', () => {
            expect(checkDefence(100)).not.toThrowError()
        })

        it('check Defence fails', () => {
            expect(() => checkDefence(stats.wrong_defence)).toThrowError(Error)
        })
    })

    describe('check Evasion checks', () => {
        it('check Evasion Works', () => {
            expect(checkEvasion(0.8)).not.toThrowError()
        })

        it('check low Evasion fails', () => {
            expect(() => checkEvasion(stats.wrong_lower_evasion)).toThrowError(Error)
        })

        it('check high Evasion fails', () => {
            expect(() => checkEvasion(stats.wrong_higher_evasion)).toThrowError(Error)
        })
    })

    describe('check hp checks', () => {
        it('check hp Works', () => {
            expect(checkHp(1)).not.toThrowError()
        })

        it('check hp fails', () => {
            expect(() => checkHp(stats.wrong_hp)).toThrowError(Error)
        })
    })

})
