import Character from '../classes/Character'

describe('Characters are created properly', () => {

    const stats = {
        correct_basic_stats: {
            accuracy: 1,
            attack: 1,
            attack_interval: 1,
            att_speed: 1,
            crit: 0,
            crit_multiplier: 1,
            current_hp: 0,
            deffence: 0,
            evasion: 0,
            hp: 0,
        },
        incorrect_high_stats: {
            accuracy: -11,
            attack: -43,
            attack_interval: -23,
            att_speed: 0,
            crit: -1,
            crit_multiplier: 0,
            current_hp: -9,
            deffence: 0,
            evasion: -9,
            hp: -4,
        },
        base_stats: {
            accuracy: 1,
            attack: 1,
            crit: 0,
            crit_multiplier: 1,
            current_hp: 0,
            hp: 0,
        }
    }

    const expected_basic_stats = {
        "accuracy": 1,
        "attack_interval": 1,
        "att_speed": 1,
        "attack": 1,
        "crit": 0,
        "crit_multiplier": 1,
        "current_hp": 0,
        "deffence": 0,
        "evasion": 0,
        "hp": 0
    }

    const expected_basic_object = {
        "actions": undefined,
        "alive": true,
        "checkErrors": jest.fn(),
        "getProb": jest.fn(),
        "rand": jest.fn(),
        "stats": expected_basic_stats
    }

    test('Created Character without params', () => {
        let char = new Character()

        expect(char.stats).toEqual(stats.base_stats)
    })

    test('Created Character with correct Stats', () => {
        let char = new Character({
            stats: stats.correct_basic_stats
        })

        expect(typeof char).toBe('object')
        expect(char.stats).toStrictEqual(stats.correct_basic_stats)
    })

    test('Created Character with wrong Stats', () => {
        expect(() => new Character({
            stats: stats.incorrect_high_stats
        })).toThrowError(Error)
    })
})

describe('Character attacks', () => {
    const ATTACKS = {
        NORMAL: { type: "normal", value: 1 },
        MISS: { type: "miss", value: 0 },
        CRITICAL: { type: "critical", value: 1 }
    }

    test('Character attacks', () => {
        let char = new Character()

        expect(char.attack()).toStrictEqual(ATTACKS.NORMAL)
    })

    test('Character attacks and miss', () => {
        let char = new Character({stats: {accuracy: 0}})

        expect(char.attack()).toStrictEqual(ATTACKS.MISS)
    })

    test('Character attacks and crit', () => {
        let char = new Character({stats: {crit: 1, crit_multiplier: 1}})

        expect(char.attack()).toStrictEqual(ATTACKS.CRITICAL)
    })

    test('Character callback works', () => {
        let char = new Character()
        let solution ;
        char.attack( (attackObject) => {
            solution = {...attackObject }
            solution.value += 2;
        })
        expect(solution).toStrictEqual({ type: "normal", value: 3 })
    })
})