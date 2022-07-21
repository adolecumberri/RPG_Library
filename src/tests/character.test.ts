import Character from '../classes/Character'
import { DEFAULT_ATTACK_OBJECT, DEFAULT_DEFENCE_OBJECT } from '../constants/defaults'
import discriminators from '../constants/discriminators'
import { CHARACTER_STATS as stats } from './constants/stats'
import { IAttackObject } from '../interfaces'
import { IDefenceFunction } from '../interfaces/Character.Interface'

describe('Characters are created properly', () => {

    test('Created Character without params', () => {
        let char = new Character()

        expect(char.stats).toEqual(stats.base_stats)
    })

    test('Created Character with correct Stats', () => {
        let char = new Character({
            constructorStats: stats.correct_basic_stats
        })

        expect(typeof char).toBe('object')
        expect(char.stats).toStrictEqual(stats.correct_basic_stats)
    })

    test('Created Character with wrong Stats', () => {
        expect(() => new Character({
            constructorStats: stats.incorrect_high_stats
        })).toThrowError(Error)
    })
})

describe('Character attacks', () => {
    const ATTACKS = {
        NORMAL: { discriminator: discriminators.ATTACK_OBJECT, type: "normal", value: 1 },
        MISS: { discriminator: discriminators.ATTACK_OBJECT, type: "miss", value: 0 },
        CRITICAL: { discriminator: discriminators.ATTACK_OBJECT, type: "critical", value: 1 }
    }

    test('Character attacks', () => {
        let char = new Character()

        expect(char.attack()).toStrictEqual(ATTACKS.NORMAL)
    })

    test('Character attacks and miss', () => {
        let char = new Character({ constructorStats: { accuracy: 0 } })

        expect(char.attack()).toStrictEqual(ATTACKS.MISS)
    })

    test('Character attacks and crit', () => {
        let char = new Character({ constructorStats: { crit: 1, crit_multiplier: 1 } })

        expect(char.attack()).toStrictEqual(ATTACKS.CRITICAL)
    })

    test('Character callback works', () => {
        let char = new Character()
        let solution;
        char.attack((attackObject) => {
            solution = { ...attackObject }
            solution.value += 2;
        })
        expect(solution).toStrictEqual({ discriminator: "attack_object", type: "normal", value: 3 })
    })
})

describe('Character defence', () => {
    let attackObject = DEFAULT_ATTACK_OBJECT
    let highAttackObject = {...DEFAULT_ATTACK_OBJECT, value: 9999 } as IAttackObject

    test('defend works as expected', () => {
        let char = new Character()

        expect(char.defend(attackObject)).toEqual({
            discriminator: discriminators['DEFENCE_OBJECT'],
            value: 0,
            type: 'normal'
        })

        expect(char.defend(highAttackObject)).toEqual({
            discriminator: discriminators['DEFENCE_OBJECT'],
            value: 9999,
            type: 'normal'
        })
    })

    test('defend works as expected with min_damage_dealt', () => {
        let char = new Character({
            minDamageDealt: 5
        })

        expect(char.defend(attackObject)).toEqual({
            discriminator: discriminators['DEFENCE_OBJECT'],
            value: 5,
            type: 'normal'
        })

        expect(char.defend(highAttackObject)).toEqual({
            discriminator: discriminators['DEFENCE_OBJECT'],
            value: 9999,
            type: 'normal'
        })
    })

    test('custom defendFunction works as expected ', () => {

        const defenceFunction: IDefenceFunction = (attackObject) => {
            let defenceObject = DEFAULT_DEFENCE_OBJECT
            defenceObject.type = 'evasion'
            defenceObject.value = 10

            return defenceObject
        }

        let char = new Character({
            defenceFunction
        })

        expect(char.defend(attackObject)).toEqual({
            discriminator: discriminators['DEFENCE_OBJECT'],
            value: 10,
            type: 'evasion'
        })

        expect(char.defend(highAttackObject)).toEqual({
            discriminator: discriminators['DEFENCE_OBJECT'],
            value: 10,
            type: 'evasion'
        })
    })
})  